@echo off
echo ============================================================
echo 🚀 Starting EduMotiv Mock Backend Server
echo ============================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js not found! Please install Node.js from https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js found
node --version

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm not found! Please install Node.js from https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo ✅ npm found
npm --version

REM Install dependencies if node_modules doesn't exist
if not exist node_modules (
    echo 📦 Installing dependencies...
    npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed
) else (
    echo ✅ Dependencies already installed
)

echo.
echo 🚀 Starting mock backend server...
echo 📝 Available at: http://localhost:8000
echo 🔄 Frontend should be running at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the server
node mock-backend.js

pause