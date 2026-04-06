@echo off
echo Starting KL University ERP...
start "Backend" run-backend.bat
start "Frontend" run-frontend.bat
echo Both services are starting in separate windows.
pause
