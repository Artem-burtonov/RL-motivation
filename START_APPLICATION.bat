@echo off
title EduMotiv - Student Motivation System

echo ================================================================
echo 🎓 EduMotiv - Student Motivation System
echo ================================================================
echo 🚀 Starting both Frontend and Backend servers...
echo ================================================================
echo.

REM Set colors
set GREEN=92
set RED=91
set YELLOW=93
set BLUE=94
set RESET=0

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [%RED%m❌ Node.js not found![%RESET%m
    echo Please install Node.js from https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo [%GREEN%m✅ Node.js found[%RESET%m
node --version

REM Install backend dependencies
if not exist node_modules (
    echo [%YELLOW%m📦 Installing backend dependencies...[%RESET%m
    npm install express cors
    if %ERRORLEVEL% NEQ 0 (
        echo [%RED%m❌ Failed to install backend dependencies[%RESET%m
        pause
        exit /b 1
    )
)

REM Install frontend dependencies
cd frontend
if not exist node_modules (
    echo [%YELLOW%m📦 Installing frontend dependencies...[%RESET%m
    npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [%RED%m❌ Failed to install frontend dependencies[%RESET%m
        pause
        exit /b 1
    )
)
cd ..

echo.
echo [%BLUE%m🚀 Starting Backend Server (Port 8000)...[%RESET%m
start "EduMotiv Backend" cmd /k "echo [%GREEN%m🔧 Backend Server[%RESET%m && node mock-backend.js"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

echo [%BLUE%m🌐 Starting Frontend Server (Port 3000)...[%RESET%m
cd frontend
start "EduMotiv Frontend" cmd /k "echo [%GREEN%m🎨 Frontend Server[%RESET%m && npm start"
cd ..

REM Wait for servers to start
timeout /t 5 /nobreak >nul

echo.
echo [%GREEN%m✅ Both servers are starting![%RESET%m
echo.
echo [%YELLOW%m📋 Application URLs:[%RESET%m
echo   🌐 Frontend: http://localhost:3000
echo   🔧 Backend:  http://localhost:8000
echo.
echo [%YELLOW%m🎮 Test Credentials:[%RESET%m
echo   📧 Email: test@example.com
echo   🔐 Password: password123
echo.
echo [%BLUE%m📝 Instructions:[%RESET%m
echo   1. Wait for both servers to fully start
echo   2. Open http://localhost:3000 in your browser
echo   3. Try registering a new account or use test credentials
echo   4. Close this window when done
echo.

REM Keep this window open
echo [%YELLOW%m⚠️  Do not close this window while using the application![%RESET%m
echo.
pause