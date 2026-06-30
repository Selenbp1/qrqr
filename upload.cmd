@echo off
if not exist "%~dp0.env.ftp" (
  echo .env.ftp 파일이 없습니다.
  echo .env.ftp.example 을 복사해서 FTP ID/비밀번호를 입력하세요.
  copy "%~dp0.env.ftp.example" "%~dp0.env.ftp"
  notepad "%~dp0.env.ftp"
  exit /b 1
)
"C:\Program Files\nodejs\node.exe" "%~dp0src\upload-ftp.js"
