@echo off
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\stop-always-on.ps1"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\install-always-on.ps1"
