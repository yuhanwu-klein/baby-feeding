@echo off
echo ========================================
echo   Baby Room Tour - Starting Game...
echo ========================================
echo.
echo Game will open in your default browser
echo Press Ctrl+C to stop the server
echo.

cd /d "%~dp0"

REM Try Python 3
python -m http.server 8080 2>nul
if %errorlevel% neq 0 (
    REM Try Python 2
    python -m SimpleHTTPServer 8080 2>nul
)

pause
