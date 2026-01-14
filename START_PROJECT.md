# 🚀 HƯỚNG DẪN KHỞI ĐỘNG DỰ ÁN BRIGHT FUTURE

## 📋 CÁC BƯỚC CẦN THIẾT MỖI KHI MỞ MÁY

### **Bước 1: Khởi động Redis Server** (Bắt buộc cho Chatbot)

Redis cần chạy trước khi start backend FastAPI.

**Cách 1: Chạy thủ công**
```powershell
# Mở terminal mới
redis-server
```

**Cách 2: Chạy bằng Docker** (nếu có Docker)
```powershell
docker run -d -p 6379:6379 redis
```

**Cách 3: Cài đặt Redis cho Windows**
- Tải từ: https://github.com/microsoftarchive/redis/releases
- Hoặc dùng WSL2 với Redis

---

### **Bước 2: Khởi động Backend FastAPI** (Bắt buộc)

**Terminal 1:**
```powershell
# Di chuyển vào thư mục backend
cd C:\BrightFuture\backend

# Kích hoạt môi trường ảo
.\envq\Scripts\Activate.ps1

# Di chuyển vào thư mục ngocanh
cd ngocanh

# Khởi động FastAPI server
python -m uvicorn main:app --reload --port 8000
```

**Hoặc dùng file batch:**
```powershell
cd C:\BrightFuture\backend\ngocanh
.\start_server.bat
```

**Kiểm tra:** Mở browser: `http://localhost:8000/docs` - sẽ thấy Swagger UI

---

### **Bước 3: Khởi động Backend Flask** (Tùy chọn - chỉ cần nếu dùng tính năng bản đồ)

**Terminal 2:**
```powershell
# Di chuyển vào thư mục backend
cd C:\BrightFuture\backend

# Kích hoạt môi trường ảo (cùng venv)
.\envq\Scripts\Activate.ps1

# Di chuyển vào thư mục hoang
cd hoang

# Khởi động Flask server
python test3.py
```

**Kiểm tra:** Server sẽ chạy tại `http://localhost:5000`

---

### **Bước 4: Khởi động Frontend** (Bắt buộc)

**Terminal 3:**
```powershell
# Di chuyển vào thư mục frontend
cd C:\BrightFuture\frontend

# Khởi động Next.js development server
npm run dev
```

**Kiểm tra:** Mở browser: `http://localhost:3000`

---

## 📝 TÓM TẮT CÁC TERMINAL CẦN MỞ

| Terminal | Command | Port | Bắt buộc |
|----------|---------|------|----------|
| Terminal 1 | `redis-server` | 6379 | ✅ Có (cho Chatbot) |
| Terminal 2 | `uvicorn main:app --reload --port 8000` | 8000 | ✅ Có |
| Terminal 3 | `python test3.py` | 5000 | ⚠️ Tùy chọn |
| Terminal 4 | `npm run dev` | 3000 | ✅ Có |

---

## ⚡ SCRIPT TỰ ĐỘNG (Tùy chọn)

Tôi sẽ tạo script để khởi động tự động tất cả services.

---

## ✅ CHECKLIST TRƯỚC KHI CHẠY

- [ ] Redis server đang chạy (port 6379)
- [ ] Môi trường ảo đã được kích hoạt (`envq`)
- [ ] File `.env` đã được tạo với `GEMINI_KEY` (trong `backend/ngocanh/`)
- [ ] Google Earth Engine đã được authenticate (nếu dùng Flask app)
- [ ] Tất cả dependencies đã được cài đặt

---

## 🔍 KIỂM TRA SERVICES ĐANG CHẠY

**Kiểm tra ports:**
```powershell
netstat -ano | findstr ":3000 :5000 :6379 :8000"
```

**Kiểm tra processes:**
```powershell
Get-Process | Where-Object {$_.ProcessName -like "*python*" -or $_.ProcessName -like "*node*" -or $_.ProcessName -like "*redis*"}
```

---

## 🛑 DỪNG TẤT CẢ SERVICES

**Dừng từng terminal:**
- Nhấn `CTRL+C` trong mỗi terminal đang chạy

**Hoặc dừng tất cả Python processes:**
```powershell
taskkill /F /IM python.exe
```

**Dừng Redis:**
```powershell
# Nếu chạy bằng Docker
docker stop <container_id>

# Hoặc dừng process Redis
taskkill /F /IM redis-server.exe
```

---

## 📌 LƯU Ý QUAN TRỌNG

1. **Thứ tự khởi động:**
   - Redis → Backend FastAPI → Frontend
   - Flask backend (tùy chọn) có thể chạy song song

2. **Môi trường ảo:**
   - Luôn kích hoạt `envq` trước khi chạy backend
   - Frontend không cần môi trường ảo (dùng npm)

3. **Ports:**
   - Đảm bảo các ports không bị chiếm bởi ứng dụng khác
   - Nếu port bị chiếm, dừng process đó

4. **File .env:**
   - Phải có file `.env` trong `backend/ngocanh/` với `GEMINI_KEY`

---

## 🆘 XỬ LÝ LỖI THƯỜNG GẶP

### Lỗi "Port already in use"
```powershell
# Tìm process đang dùng port
netstat -ano | findstr :8000

# Dừng process
taskkill /F /PID <process_id>
```

### Lỗi "Module not found"
```powershell
# Đảm bảo đã kích hoạt môi trường ảo
.\envq\Scripts\Activate.ps1

# Cài đặt lại dependencies
pip install -r requirements.txt
```

### Lỗi "Redis connection refused"
- Đảm bảo Redis server đang chạy
- Kiểm tra port 6379 có bị chiếm không

---

## 📞 LIÊN HỆ

Nếu gặp vấn đề, kiểm tra:
1. Backend logs trong terminal
2. Frontend console (F12 trong browser)
3. Network tab trong browser DevTools
