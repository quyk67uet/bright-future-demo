# Bright Future - Start All Services Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  BRIGHT FUTURE - START ALL SERVICES" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if port is in use
function Test-Port {
    param([int]$Port)
    $connection = Test-NetConnection -ComputerName localhost -Port $Port -InformationLevel Quiet -WarningAction SilentlyContinue
    return $connection
}

# Check Redis
Write-Host "[1/4] Checking Redis Server..." -ForegroundColor Yellow
if (-not (Test-Port -Port 6379)) {
    Write-Host "  Starting Redis Server..." -ForegroundColor Green
    Start-Process -FilePath "redis-server" -WindowStyle Normal
    Start-Sleep -Seconds 3
} else {
    Write-Host "  Redis is already running" -ForegroundColor Green
}

# Start FastAPI Backend
Write-Host "[2/4] Starting FastAPI Backend (Port 8000)..." -ForegroundColor Yellow
if (-not (Test-Port -Port 8000)) {
    $fastapiScript = @"
cd `"$PSScriptRoot\backend\ngocanh`"
& `"$PSScriptRoot\backend\envq\Scripts\Activate.ps1`"
python -m uvicorn main:app --reload --port 8000
"@
    Start-Process powershell -ArgumentList "-NoExit", "-Command", $fastapiScript
    Start-Sleep -Seconds 3
    Write-Host "  FastAPI Backend started" -ForegroundColor Green
} else {
    Write-Host "  Port 8000 is already in use" -ForegroundColor Red
}

# Start Flask Backend (Optional)
Write-Host "[3/4] Starting Flask Backend (Port 5000) - Optional..." -ForegroundColor Yellow
if (-not (Test-Port -Port 5000)) {
    $flaskScript = @"
cd `"$PSScriptRoot\backend\hoang`"
& `"$PSScriptRoot\backend\envq\Scripts\Activate.ps1`"
python test3.py
"@
    Start-Process powershell -ArgumentList "-NoExit", "-Command", $flaskScript
    Start-Sleep -Seconds 2
    Write-Host "  Flask Backend started" -ForegroundColor Green
} else {
    Write-Host "  Port 5000 is already in use" -ForegroundColor Yellow
}

# Start Frontend
Write-Host "[4/4] Starting Frontend (Port 3000)..." -ForegroundColor Yellow
if (-not (Test-Port -Port 3000)) {
    $frontendScript = @"
cd `"$PSScriptRoot\frontend`"
npm run dev
"@
    Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendScript
    Start-Sleep -Seconds 2
    Write-Host "  Frontend started" -ForegroundColor Green
} else {
    Write-Host "  Port 3000 is already in use" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  All services are starting..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Services:" -ForegroundColor White
Write-Host "  - Redis:        http://localhost:6379" -ForegroundColor Gray
Write-Host "  - FastAPI:      http://localhost:8000" -ForegroundColor Gray
Write-Host "  - Flask:        http://localhost:5000" -ForegroundColor Gray
Write-Host "  - Frontend:     http://localhost:3000" -ForegroundColor Gray
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
