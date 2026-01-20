@echo off
echo Starting FastAPI server...
cd /d %~dp0
python -m uvicorn main:app --reload --port 8000 --host 127.0.0.1
pause
