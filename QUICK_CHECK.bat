@echo off
title Проверка статуса Student Motivation System
color 0B

echo.
echo 🔍 Проверка статуса Student Motivation System
echo ================================================

REM Проверяем Python
echo.
echo 🐍 Python:
python --version 2>nul
if errorlevel 1 (
    echo ❌ Python не установлен
) else (
    echo ✅ Python установлен
)

REM Проверяем Node.js
echo.
echo 📦 Node.js:
node --version 2>nul
if errorlevel 1 (
    echo ❌ Node.js не установлен
) else (
    echo ✅ Node.js установлен
)

REM Проверяем .env файл
echo.
echo ⚙️ Конфигурация:
if exist "backend\.env" (
    echo ✅ .env файл существует
    type backend\.env
) else (
    echo ❌ .env файл не найден
)

REM Проверяем виртуальное окружение
echo.
echo 🔧 Backend окружение:
if exist "backend\venv" (
    echo ✅ Виртуальное окружение создано
) else (
    echo ❌ Виртуальное окружение не найдено
)

REM Проверяем зависимости frontend
echo.
echo 🎨 Frontend зависимости:
if exist "frontend\node_modules" (
    echo ✅ Node.js зависимости установлены
) else (
    echo ❌ Node.js зависимости не установлены
)

REM Проверяем базу данных
echo.
echo 📊 База данных:
if exist "backend\student_motivation.db" (
    echo ✅ База данных создана
) else (
    echo ❌ База данных не найдена
)

echo.
echo ================================================
echo Для запуска приложения используйте: FINAL_START.bat
echo ================================================
pause
