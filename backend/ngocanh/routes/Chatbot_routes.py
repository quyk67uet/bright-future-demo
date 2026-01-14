from fastapi import APIRouter, HTTPException
import uuid
from langdetect import detect, LangDetectException
from services.Chatbot_service import ChatbotService
from schemas import ChatRequest

router = APIRouter()

@router.post("/chat")
async def chat(request: ChatRequest):
    try:
        # Xử lý session_id
        session_id = str(uuid.uuid4()) if request.create_new_session else (request.session_id or str(uuid.uuid4()))
        #session_id = str(uuid.uuid4())
        try:
            language = request.language or detect(request.message)
            # Chỉ chấp nhận vi hoặc en
            language = 'vi' if language == 'vi' else 'en'
        except LangDetectException:
            # Nếu không detect được ngôn ngữ, mặc định là tiếng Việt
            language = 'vi'

        # Khởi tạo ChatbotService một lần và tái sử dụng
        chatbot_service = ChatbotService()
        
        # Xử lý tin nhắn
        response = await chatbot_service.process_message(
            message=request.message,
            session_id=session_id,
            language=language
        )
        
        return response

    except Exception as e:
        # Log error ở đây nếu cần
        raise HTTPException(
            status_code=500,
            detail=f"Error processing chat: {str(e)}"
        )