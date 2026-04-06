@echo off
echo Starting KL University ERP Backend...
cd backend
if not exist "mvnw.cmd" (
    echo Error: mvnw.cmd not found in backend directory.
    pause
    exit /b
)
call mvnw.cmd clean spring-boot:run
pause
