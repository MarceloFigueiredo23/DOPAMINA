@echo off
cd /d "%~dp0"
echo Iniciando DopShop em http://localhost:8765
start "" python -m http.server 8765
timeout /t 2 /nobreak >nul
start "" http://localhost:8765
