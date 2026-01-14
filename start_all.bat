@echo off
echo ========================================
echo   BRIGHT FUTURE - START ALL SERVICES
echo ========================================
echo.

echo [1/4] Starting Redis Server...
start "Redis Server" cmd /k "echo Starting Redis... && redis-server"
timeout /t 3 /nobreak >nul

echo [2/4] Starting FastAPI Backend (Port 8000)...
cd backend\ngocanh
start "FastAPI Backend" cmd /k "cd /d %~dp0backend && .\envq\Scripts\Activate.ps1 && cd ngocanh && python -m uvicorn main:app --reload --port 8000"
timeout /t 3 /nobreak >nul

echo [3/4] Starting Flask Backend (Port 5000) - Optional...
cd ..\hoang
start "Flask Backend" cmd /k "cd /d %~dp0backend && .\envq\Scripts\Activate.ps1 && cd hoang && python test3.py"
timeout /t 2 /nobreak >nul

echo [4/4] Starting Frontend (Port 3000)...
cd ..\..\frontend
start "Frontend Next.js" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ========================================
echo   All services are starting...
echo ========================================
echo.
echo Services:
echo   - Redis:        http://localhost:6379
echo   - FastAPI:      http://localhost:8000
echo   - Flask:        http://localhost:5000
echo   - Frontend:     http://localhost:3000
echo.
echo Press any key to exit this window...
pause >nul
