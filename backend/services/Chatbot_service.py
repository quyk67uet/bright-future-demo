import google.generativeai as genai
import json
import os
import re
import csv
from typing import Dict, List, Optional

from dotenv import load_dotenv
from langdetect import LangDetectException, detect
import redis
from services.PV_service import calculate_solar_energy


load_dotenv()


class ChatbotService:
    """Conversational assistant for solar PV guidance with multi-turn memory."""

    def __init__(self) -> None:
        api_key = os.getenv("GEMINI_KEY")
        if not api_key:
            raise RuntimeError("Missing GEMINI_KEY environment variable")

        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-2.5-flash")

        # Redis keeps chat history per session_id
        self.redis_client = redis.Redis(host="localhost", port=6379, db=0)

        # Load available solar panels
        self.panel_inventory = self._load_panel_data()

        panel_list = ", ".join([
            f"{p.get('Manufacturer', 'N/A')} {p.get('Model Name', 'N/A')} "
            f"({p.get('Watt peak', 'N/A')}Wp, {p.get('Efficiency', 'N/A')}%)"
            for p in self.panel_inventory
        ]) if self.panel_inventory else "Đang cập nhật"

        self.system_prompt = (
            "Bạn là chuyên gia tư vấn lắp đặt và bảo trì hệ thống điện mặt trời. "
            "Hỗ trợ 2 loại khách hàng: (1) Hộ gia đình - tư vấn lắp đặt tiết kiệm điện, "
            "(2) Nhà máy điện - tư vấn bảo trì, tối ưu hệ thống quy mô lớn. "
            "Khi người dùng đề cập 'hộ gia đình' hoặc 'nhà máy', điều chỉnh tư vấn cho phù hợp. "
            "Trả lời bằng văn bản thuần, KHÔNG dùng markdown, bullet points (* - #), KHÔNG in đậm (**text**). "
            "Giữ ngôn ngữ theo người dùng (vi/en), ngắn gọn (≤100 từ). "
            f"Các tấm pin khả dụng: {panel_list}. "
            "Nếu thiếu thông số (kWp, vị trí, module, tilt, azimuth, performance ratio), hỏi tối đa 1 câu."
        )

        # Limit history length to keep prompts small
        self.max_history = 12

    def _load_panel_data(self) -> List[Dict[str, str]]:
        base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
        csv_path = os.path.join(base_dir, "module_pv", "module_data.csv")
        panels = []
        try:
            with open(csv_path, "r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                for row in reader:
                    panels.append(row)
        except Exception as e:
            print(f"Warning: Could not load panel data: {e}")
        return panels

    async def process_message(
        self, message: str, session_id: str, language: str = "vi"
    ) -> Dict:
        session = self._get_session(session_id)
        language = self._detect_language(message, language or session.get("language"))
        session["language"] = language

        session["chat_history"].append({"role": "user", "content": message})
        session["chat_history"] = session["chat_history"][-self.max_history :]

        # Quick, friendly intro on first turn; avoid overwhelming user
        if not session.get("introduced") and len(session["chat_history"]) == 1:
            intro = (
                "Chào bạn! Tôi là chuyên gia tư vấn điện mặt trời. Bạn cần tư vấn cho hộ gia đình hay nhà máy điện?"
                if language == "vi"
                else "Hi! I'm your solar energy expert. Are you looking for household or industrial plant consultation?"
            )
            session["introduced"] = True
            session["chat_history"].append({"role": "assistant", "content": intro})
            self._save_session(session_id, session)
            return {"message": intro, "chat_history": session["chat_history"], "language": language}

        extracted = self._extract_parameters(message)
        session.update(extracted)

        if self._has_required_params(session):
            session = self._maybe_refresh_stats(session)

        prompt = self._build_prompt(session["chat_history"], language, session.get("stats"))
        response = self.model.generate_content(prompt)
        answer = response.text.strip()

        session["chat_history"].append({"role": "assistant", "content": answer})
        session["chat_history"] = session["chat_history"][-self.max_history :]
        self._save_session(session_id, session)

        return {
            "message": answer,
            "chat_history": session["chat_history"],
            "language": language,
        }

    def _build_prompt(
        self, history: List[Dict[str, str]], language: str, stats: Optional[Dict] = None
    ) -> str:
        history_text = []
        for turn in history:
            speaker = "Người dùng" if turn["role"] == "user" else "Trợ lý"
            history_text.append(f"{speaker}: {turn['content']}")

        guidance = (
            "Nếu thiếu dữ liệu (kWp, vị trí, module, tilt, azimuth, performance ratio), hãy hỏi tối đa 1 câu bổ sung mỗi lượt. Trả lời ngắn gọn (≤80 từ)."
            if language == "vi"
            else "If key data is missing (kWp, location, module, tilt, azimuth, performance ratio), ask at most 1 follow-up per turn. Keep replies concise (≤80 words)."
        )

        stats_block = ""
        if stats:
            stats_block = (
                "\nThông tin sản lượng gần nhất:\n" + self._format_stats_summary(stats, language)
                if language == "vi"
                else "\nLatest production estimates:\n" + self._format_stats_summary(stats, language)
            )

        return (
            f"System: {self.system_prompt}\n"
            f"Ngôn ngữ: {'Tiếng Việt' if language == 'vi' else 'English'}\n"
            f"Hướng dẫn: {guidance}\n"
            f"Lịch sử:\n" + "\n".join(history_text) + stats_block
        )

    def _detect_language(self, message: str, fallback: str = "vi") -> str:
        try:
            detected = detect(message)
            return "vi" if detected == "vi" else "en"
        except LangDetectException:
            return fallback or "vi"

    def _get_session(self, session_id: str) -> Dict:
        raw = self.redis_client.get(f"solar:context:{session_id}")
        if raw:
            return json.loads(raw)
        return {"chat_history": [], "language": "vi"}

    def _save_session(self, session_id: str, session: Dict) -> None:
        self.redis_client.setex(
            f"solar:context:{session_id}", 3600, json.dumps(session)
        )

    def _extract_parameters(self, message: str) -> Dict:
        patterns = {
            "capacity": r"capacity\s*[:=]\s*([0-9]+\.?[0-9]*)",
            "latitude": r"latitude\s*[:=]\s*([-+]?[0-9]+\.?[0-9]*)",
            "longitude": r"longitude\s*[:=]\s*([-+]?[0-9]+\.?[0-9]*)",
            "surface_tilt": r"tilt\s*[:=]\s*([0-9]+\.?[0-9]*)",
            "surface_azimuth": r"azimuth\s*[:=]\s*([0-9]+\.?[0-9]*)",
            "performance_ratio": r"performance_ratio\s*[:=]\s*([0-9]+\.?[0-9]*)",
            "timezone": r"timezone\s*[:=]\s*([A-Za-z_\\/]+)",
            "model": r"model\s*[:=]\s*([\w\-\.\+]+)",
        }
        found: Dict[str, object] = {}
        lower_msg = message.lower()
        for key, pattern in patterns.items():
            match = re.search(pattern, lower_msg)
            if match:
                value = match.group(1)
                try:
                    if key in {"timezone", "model"}:
                        found[key] = value
                    else:
                        found[key] = float(value)
                except ValueError:
                    continue
        return found

    def _has_required_params(self, session: Dict) -> bool:
        required = [
            "capacity",
            "latitude",
            "longitude",
            "timezone",
            "model",
            "surface_tilt",
            "surface_azimuth",
            "performance_ratio",
        ]
        return all(param in session for param in required)

    def _maybe_refresh_stats(self, session: Dict) -> Dict:
        try:
            stats = calculate_solar_energy(
                plant_capacity=float(session["capacity"]),
                latitude=float(session["latitude"]),
                longitude=float(session["longitude"]),
                timezone=str(session["timezone"]),
                module_selection=str(session["model"]),
                surface_tilt=float(session["surface_tilt"]),
                surface_azimuth=int(session["surface_azimuth"]),
                performance_ratio=float(session["performance_ratio"]),
            )
            session["stats"] = stats
        except Exception:
            pass
        return session

    def _format_stats_summary(self, stats: Dict, language: str) -> str:
        if language == "vi":
            return (
                f"- Năng lượng/ngày (tb): {stats['average_daily_energy']:.2f} kWh\n"
                f"- Năng lượng/năm (ước tính): {stats['yearly_total_energy']:.0f} kWh\n"
                f"- GII/ngày (tb): {stats['average_daily_gii']:.2f} kWh/m²\n"
                f"- Module: {stats.get('module_efficiency', 'N/A')} hiệu suất"
            )
        return (
            f"- Daily energy (avg): {stats['average_daily_energy']:.2f} kWh\n"
            f"- Yearly energy (est): {stats['yearly_total_energy']:.0f} kWh\n"
            f"- Daily GII (avg): {stats['average_daily_gii']:.2f} kWh/m²\n"
            f"- Module eff: {stats.get('module_efficiency', 'N/A')}"
        )
