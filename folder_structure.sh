/project-root
│
├── /backend # Thư mục Backend (FastAPI)
│ ├── /app
│ │ ├── /api # Các endpoint API
│ │ ├── /models # Các mô hình tương tác với cơ sở dữ liệu
│ │ ├── /services # Dịch vụ kết nối và xử lý logic
│ │ ├── /config # Cấu hình chung
│ │ ├── /utils # Các tiện ích chung
│ │ └── main.py # Điểm vào của ứng dụng Backend
│ └── requirements.txt # Các thư viện phụ thuộc cho Backend
│
├── /frontend # Thư mục Frontend (NextJS)
│
├── /ai_models # Thư mục chứa mô hình AI
│
├── /scripts # Các script hỗ trợ (CI/CD, Deploy,...)
│ ├── deploy.sh # Triển khai ứng dụng
│ ├── start_dev.sh # Khởi động ứng dụng cho môi trường phát triển
│ └── build_docker.sh # Tạo Docker image
│
├── /config # Cấu hình chung cho dự án
│ ├── .env # Biến môi trường
│ ├── database.py # Cấu hình cơ sở dữ liệu
│ └── settings.py # Các cài đặt khác
│
├── /tests # Thư mục kiểm thử
│ ├── /backend_tests # Kiểm thử cho Backend
│ ├── /frontend_tests # Kiểm thử cho Frontend
│ └── /integration_tests # Kiểm thử tích hợp
│
└── README.md # Thông tin giới thiệu dự án
