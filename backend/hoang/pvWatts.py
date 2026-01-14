import streamlit as st
import requests
import json
import pandas as pd
import matplotlib.pyplot as plt

API_KEY = "iNCJ0WdwiGMysKGJTYQySapNZ1UBbjVRXeyeuCI7"

st.title("PVWatts Solar Energy Calculator")

# Nhập thông tin từ người dùng
lat = st.text_input("Latitude (độ vĩ)", value="10.7769")
lon = st.text_input("Longitude (độ kinh)", value="106.6951")
system_capacity = st.number_input("Công suất hệ thống (kW)", value=5)
tilt = st.number_input("Góc nghiêng (độ)", value=20)
azimuth = st.number_input("Góc phương vị (độ)", value=180)
array_type = st.selectbox(
    "Kiểu bố trí", options=["0 - Fixed", "1 - Adjustable", "2 - Tracking"], index=0
)
module_type = st.selectbox(
    "Loại mô-đun",
    options=["0 - Standard", "1 - High Efficiency", "2 - Thin Film"],
    index=0,
)
losses = st.number_input("Tổn thất (%)", value=14)

# Chuyển đổi lựa chọn kiểu bố trí và loại mô-đun thành số
array_type = int(array_type.split(" ")[0])
module_type = int(module_type.split(" ")[0])

# Nút để gọi API
if st.button("Tính toán"):
    # Gọi API
    url = f"https://developer.nrel.gov/api/pvwatts/v6.json?api_key={API_KEY}&lat={lat}&lon={lon}&system_capacity={system_capacity}&tilt={tilt}&azimuth={azimuth}&array_type={array_type}&module_type={module_type}&losses={losses}&output_format=json"

    response = requests.get(url)
    data = response.json()

    # Xử lý và in kết quả
    if "outputs" in data:
        outputs = data["outputs"]
        monthly_ac_energy = outputs["ac_monthly"]
        monthly_solar_radiation = outputs["solrad_monthly"]

        # Chuyển đổi dữ liệu thành DataFrame
        months = [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
        ]
        df = pd.DataFrame(
            {
                "Tháng": months,
                "Radiation (kWh/m²/ngày)": monthly_solar_radiation,
                "AC Energy (kWh)": monthly_ac_energy,
            }
        )

        # Hiển thị bảng kết quả
        st.subheader("Kết quả tính toán:")
        st.dataframe(df)

        # Vẽ biểu đồ
        fig, ax1 = plt.subplots(figsize=(10, 6))

        # Biểu đồ cột cho Solar Radiation
        color = "tab:blue"
        ax1.set_xlabel("Tháng")
        ax1.set_ylabel("Radiation (kWh/m²/ngày)", color=color)
        ax1.bar(
            df["Tháng"],
            df["Radiation (kWh/m²/ngày)"],
            color=color,
            alpha=0.6,
            label="Radiation",
        )
        ax1.tick_params(axis="y", labelcolor=color)

        # Biểu đồ đường cho AC Energy
        ax2 = ax1.twinx()
        color = "tab:orange"
        ax2.set_ylabel("AC Energy (kWh)", color=color)
        ax2.plot(
            df["Tháng"],
            df["AC Energy (kWh)"],
            color=color,
            marker="o",
            label="AC Energy",
        )
        ax2.tick_params(axis="y", labelcolor=color)

        # Điều chỉnh nhãn trục x để tránh chồng chéo
        plt.xticks(rotation=45)  # Xoay nhãn
        plt.title("Biểu đồ Radiation và AC Energy theo tháng")
        fig.tight_layout()
        st.pyplot(fig)

        # In tổng năng lượng hàng năm với định dạng dễ nhìn
        annual_ac_energy = outputs["ac_annual"]
        average_solar_radiation = outputs["solrad_annual"]

        # Hiển thị tổng năng lượng hàng năm với định dạng đẹp
        st.subheader("Tổng năng lượng hàng năm:")
        st.write(
            f"🌞 **Tổng Solar Radiation:** {average_solar_radiation:.2f} kWh/m²/ngày"
        )
        st.write(f"⚡ **Tổng AC Energy:** {annual_ac_energy:.2f} kWh")
    else:
        st.error("Lỗi: " + str(data.get("error", "Lỗi không xác định")))
