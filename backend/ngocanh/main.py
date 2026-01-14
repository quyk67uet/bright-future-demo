from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from routes import co2_routes, forecast_routes, Chatbot_routes, pv_routes, statistics_routes

app = FastAPI()

# Custom CORS middleware để đảm bảo headers được thêm vào
class CustomCORSMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        origin = request.headers.get("origin")
        allowed_origins = [
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "http://localhost:3001",
            "http://127.0.0.1:3001",
        ]
        
        if request.method == "OPTIONS":
            response = Response()
            if origin in allowed_origins:
                response.headers["Access-Control-Allow-Origin"] = origin
                response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, PATCH"
                response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, Accept, Origin, X-Requested-With"
                response.headers["Access-Control-Max-Age"] = "3600"
            return response
        
        try:
            response = await call_next(request)
        except Exception as e:
            # Tạo response cho lỗi và thêm CORS headers
            response = Response(
                content=f"Internal Server Error: {str(e)}",
                status_code=500
            )
        
        # Luôn thêm CORS headers vào response (kể cả lỗi)
        if origin in allowed_origins:
            response.headers["Access-Control-Allow-Origin"] = origin
            response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, PATCH"
            response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, Accept, Origin, X-Requested-With"
            response.headers["Access-Control-Allow-Credentials"] = "false"
        
        return response

# Thêm custom CORS middleware
app.add_middleware(CustomCORSMiddleware)

# Thêm FastAPI CORS middleware làm backup
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600,
)

app.include_router(co2_routes.router, prefix="/co2", tags=["Carbon dioxide emissions"])

app.include_router(forecast_routes.router, prefix="/forecast", tags=["Forecast"])

app.include_router(pv_routes.router, prefix="/solar", tags=["Solar Calculations"])

# Route statistics không có prefix để tương thích với frontend
app.include_router(statistics_routes.router, tags=["Statistics"])

app.include_router(Chatbot_routes.router, prefix="/chatbot", tags=["Chatbot"])
