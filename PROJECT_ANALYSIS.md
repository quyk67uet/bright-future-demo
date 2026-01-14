# PHÂN TÍCH DỰ ÁN BRIGHT FUTURE

## 📋 TỔNG QUAN DỰ ÁN

Bright Future là một dự án web application về năng lượng mặt trời, bao gồm:
- **Frontend**: Next.js (React + TypeScript)
- **Backend**: FastAPI (Python) - thư mục `ngocanh`
- **Backend phụ**: Flask (Python) - thư mục `hoang` (sử dụng Google Earth Engine)

---

## 🏗️ CẤU TRÚC DỰ ÁN

### 1. **Frontend** (`frontend/`)
- **Framework**: Next.js 14 với TypeScript
- **UI Library**: Tailwind CSS, Radix UI components
- **Maps**: Leaflet, React Leaflet
- **Charts**: Recharts
- **HTTP Client**: Axios

**Cấu trúc chính:**
```
frontend/src/
├── app/                    # Next.js App Router
│   ├── (pages)/           # Các trang chính
│   │   ├── (home)/        # Trang chủ
│   │   ├── estimator/     # Trang ước tính năng lượng
│   │   ├── consulting/    # Trang tư vấn
│   │   ├── forecast/      # Trang dự báo
│   │   └── faq/           # Câu hỏi thường gặp
│   ├── components/        # Components tái sử dụng
│   │   ├── chatbot/       # Chatbot component
│   │   ├── chart/         # Biểu đồ
│   │   ├── estimator/     # Components ước tính
│   │   └── ...
│   └── helpers/           # Utility functions
```

**Kết nối Backend:**
- Chatbot: `http://localhost:8000/chatbot/chat`
- Solar Calculation: `http://localhost:8000/solar/solar_calculation`
- Forecast: `http://localhost:8000/forecast/forecast`
- CO2 Calculator: `http://localhost:8000/co2/calculator`
- Statistics: `http://localhost:8000/statistics/`
- Earth Engine Map: `http://localhost:5000` (Flask app)

---

### 2. **Backend chính** (`backend/ngocanh/`)
- **Framework**: FastAPI
- **Port**: 8000 (mặc định)

**Cấu trúc:**
```
backend/ngocanh/
├── main.py                 # Entry point, khởi tạo FastAPI app
├── routes/                 # API endpoints
│   ├── co2_routes.py      # Tính toán CO2
│   ├── forecast_routes.py # Dự báo năng lượng
│   ├── PV_routes.py       # Tính toán năng lượng mặt trời
│   └── Chatbot_routes.py # Chatbot API
├── services/               # Business logic
│   ├── co2_service.py
│   ├── PV_service.py
│   └── Chatbot_service.py
├── Models/                 # Machine Learning models
│   ├── ClassifiedWeatherTypes/  # Weather classification models
│   ├── Fitted_Models/            # Prediction models
│   └── Fitted_Standardizers/     # Data scalers
├── module_pv/              # Dữ liệu module pin mặt trời
│   └── module_data.csv
└── schemas.py             # Pydantic models
```

**API Endpoints:**

1. **CO2 Calculator** (`/co2/calculator`)
   - Method: GET
   - Params: `kwh` (float/int)
   - Tính toán lượng CO2 tiết kiệm được

2. **Solar Calculation** (`/solar/solar_calculation`)
   - Method: GET
   - Params: `plant_capacity`, `latitude`, `longitude`, `timezone`, `surface_tilt`, `surface_azimuth`, `module_selection`, `performance_ratio`
   - Tính toán sản lượng điện mặt trời

3. **Forecast** (`/forecast/forecast`)
   - Method: POST
   - Body: `{start_date, end_date}`
   - Dự báo năng lượng sử dụng ML models

4. **Chatbot** (`/chatbot/chat`)
   - Method: POST
   - Body: `{message, session_id?, language?, create_new_session?}`
   - Chatbot tư vấn năng lượng mặt trời

---

### 3. **Backend phụ** (`backend/hoang/`)
- **Framework**: Flask
- **Port**: 5000 (mặc định)
- **Mục đích**: Tích hợp Google Earth Engine để hiển thị bản đồ năng lượng mặt trời

**Files:**
- `test3.py`: Flask app với Google Earth Engine
- `pvWatts.py`: Streamlit app sử dụng NREL PVWatts API (không được tích hợp vào main app)

---

## 🔑 API KEYS VÀ CẤU HÌNH CẦN THIẾT

### ⚠️ **BẮT BUỘC PHẢI CÓ:**

#### 1. **Google Gemini API Key** (Cho Chatbot)
- **File**: `backend/ngocanh/services/Chatbot_service.py`
- **Biến môi trường**: `GEMINI_KEY`
- **Cách lấy**: 
  1. Truy cập https://makersuite.google.com/app/apikey
  2. Tạo API key mới
  3. Tạo file `.env` trong `backend/ngocanh/` với nội dung:
     ```
     GEMINI_KEY=your_api_key_here
     ```
- **Sử dụng**: Chatbot service sử dụng `gemini-1.5-flash` model

#### 2. **Google Earth Engine Authentication** (Cho Flask app)
- **File**: `backend/hoang/test3.py`
- **Cách setup**:
  1. Cài đặt Google Earth Engine CLI:
     ```bash
     pip install earthengine-api
     ```
  2. Chạy lệnh authenticate:
     ```bash
     earthengine authenticate
     ```
  3. Cập nhật project ID trong code (hiện tại: `ee-phungducanh2511`)
- **Sử dụng**: Lấy dữ liệu bản đồ năng lượng mặt trời từ Global Solar Atlas

#### 3. **Airtable API Key** (Cho Chatbot - lưu thông tin khách hàng)
- **File**: `backend/ngocanh/services/Chatbot_service.py`
- **Hiện tại**: Hardcoded trong code (dòng 22-25)
- **⚠️ CẢNH BÁO**: API key đang được hardcode, nên chuyển sang biến môi trường
- **Cách lấy**:
  1. Truy cập https://airtable.com/api
  2. Tạo Personal Access Token
  3. Thêm vào `.env`:
     ```
     AIRTABLE_API_KEY=your_api_key_here
     AIRTABLE_BASE_ID=appfp2UxnBrJ07HB6
     AIRTABLE_TABLE_NAME=customer
     ```

#### 4. **Redis Server** (Cho Chatbot - lưu session)
- **File**: `backend/ngocanh/services/Chatbot_service.py`
- **Cấu hình**: `localhost:6379` (mặc định)
- **Cách cài đặt**:
  - **Windows**: Tải Redis từ https://github.com/microsoftarchive/redis/releases
  - **Linux/Mac**: 
    ```bash
    sudo apt-get install redis-server  # Ubuntu
    brew install redis                  # Mac
    ```
- **Khởi động**:
  ```bash
  redis-server
  ```

### 📝 **TÙY CHỌN (Không bắt buộc):**

#### 5. **NREL PVWatts API Key** (Cho file `pvWatts.py`)
- **File**: `backend/hoang/pvWatts.py`
- **Hiện tại**: Hardcoded `iNCJ0WdwiGMysKGJTYQySapNZ1UBbjVRXeyeuCI7`
- **⚠️ CẢNH BÁO**: API key đang được hardcode
- **Cách lấy**: https://developer.nrel.gov/signup/
- **Lưu ý**: File này là Streamlit app riêng, không được tích hợp vào main app

#### 6. **Open-Meteo API** (Cho Forecast)
- **File**: `backend/ngocanh/routes/forecast_routes.py`
- **Status**: ✅ **KHÔNG CẦN API KEY** - API miễn phí, không yêu cầu authentication
- **Endpoint**: `https://api.open-meteo.com/v1/forecast`

---

## 🚀 CÁCH CHẠY DỰ ÁN

### **Backend (FastAPI - ngocanh)**

1. **Cài đặt dependencies:**
   ```bash
   cd backend/ngocanh
   pip install -r requirements.txt
   ```

2. **Tạo file `.env`:**
   ```env
   GEMINI_KEY=your_gemini_api_key
   AIRTABLE_API_KEY=your_airtable_api_key
   AIRTABLE_BASE_ID=appfp2UxnBrJ07HB6
   AIRTABLE_TABLE_NAME=customer
   ```

3. **Khởi động Redis:**
   ```bash
   redis-server
   ```

4. **Chạy server:**
   ```bash
   cd backend/ngocanh
   uvicorn main:app --reload --port 8000
   ```

### **Backend phụ (Flask - hoang)**

1. **Cài đặt dependencies:**
   ```bash
   cd backend/hoang
   pip install -r requirements.txt
   ```

2. **Authenticate Google Earth Engine:**
   ```bash
   earthengine authenticate
   ```

3. **Chạy server:**
   ```bash
   cd backend/hoang
   python test3.py
   ```
   Server sẽ chạy tại `http://localhost:5000`

### **Frontend**

1. **Cài đặt dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Chạy development server:**
   ```bash
   npm run dev
   ```
   Server sẽ chạy tại `http://localhost:3000`

---

## 🔄 LUỒNG HOẠT ĐỘNG

### **1. Chatbot Flow:**
```
User → Frontend (ChatBot.tsx) 
  → POST /chatbot/chat 
  → ChatbotService 
  → Redis (lưu session) 
  → Gemini API (generate response)
  → Airtable (lưu thông tin khách hàng nếu cần)
  → Response về Frontend
```

### **2. Solar Calculation Flow:**
```
User → Frontend (estimator pages)
  → GET /solar/solar_calculation
  → PV_service.calculate_solar_energy()
  → pvlib (tính toán dựa trên location, module data)
  → Response về Frontend (hiển thị charts/tables)
```

### **3. Forecast Flow:**
```
User → Frontend (factory page)
  → POST /forecast/forecast
  → forecast_routes.forecast_energy()
  → Open-Meteo API (lấy weather data)
  → ML Models (dự báo năng lượng)
  → Response về Frontend (hiển thị chart)
```

### **4. Earth Engine Map Flow:**
```
User → Frontend (SolarAnalysisBusiness.tsx)
  → GET http://localhost:5000?lat=X&lon=Y
  → Flask app (test3.py)
  → Google Earth Engine (lấy solar data)
  → Render map với Leaflet
  → Response về Frontend (iframe)
```

---

## 📦 DEPENDENCIES QUAN TRỌNG

### **Backend (ngocanh):**
- `fastapi`: Web framework
- `uvicorn`: ASGI server
- `google-generativeai`: Gemini API client
- `redis`: Session storage
- `airtable`: Customer data storage
- `pvlib`: Solar energy calculations
- `pandas`, `numpy`: Data processing
- `scikit-learn`, `joblib`: ML models
- `python-dotenv`: Environment variables

### **Backend (hoang):**
- `flask`: Web framework
- `earthengine-api`: Google Earth Engine
- `geemap`: Earth Engine visualization

### **Frontend:**
- `next`: React framework
- `axios`: HTTP client
- `react-leaflet`: Maps
- `recharts`: Charts
- `tailwindcss`: Styling

---

## ⚠️ LƯU Ý QUAN TRỌNG

1. **API Keys bị hardcode**: 
   - Airtable API key trong `Chatbot_service.py`
   - NREL PVWatts API key trong `pvWatts.py`
   - **Nên chuyển sang biến môi trường**

2. **Redis bắt buộc**: 
   - Chatbot không hoạt động nếu không có Redis
   - Đảm bảo Redis đang chạy trước khi start backend

3. **Google Earth Engine Project ID**: 
   - Hiện tại: `ee-phungducanh2511`
   - Cần đảm bảo project này tồn tại và có quyền truy cập

4. **ML Models**: 
   - Các file `.pkl` trong `Models/` cần có sẵn
   - Nếu thiếu sẽ gây lỗi khi chạy forecast

5. **Module Data**: 
   - File `module_data.csv` cần có trong `module_pv/`
   - Chứa thông tin các loại pin mặt trời

---

## 📝 CHECKLIST TRƯỚC KHI CHẠY

- [ ] Cài đặt tất cả dependencies
- [ ] Tạo file `.env` với `GEMINI_KEY`
- [ ] Authenticate Google Earth Engine
- [ ] Khởi động Redis server
- [ ] Kiểm tra các file ML models có đầy đủ
- [ ] Kiểm tra `module_data.csv` có tồn tại
- [ ] Cập nhật Airtable API key (nếu cần)
- [ ] Chạy backend FastAPI (port 8000)
- [ ] Chạy backend Flask (port 5000) - nếu cần map
- [ ] Chạy frontend (port 3000)

---

## 🔗 TÀI LIỆU THAM KHẢO

- FastAPI: https://fastapi.tiangolo.com/
- Google Gemini API: https://ai.google.dev/
- Google Earth Engine: https://earthengine.google.com/
- Redis: https://redis.io/
- Airtable API: https://airtable.com/api
- Open-Meteo: https://open-meteo.com/
- NREL PVWatts: https://developer.nrel.gov/docs/solar/pvwatts/v6/
