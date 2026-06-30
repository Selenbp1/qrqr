@echo off
"C:\Program Files\nodejs\node.exe" "%~dp0src\generate-qr.js"
if errorlevel 1 exit /b 1
echo.
echo QR saved to public\qr.png
