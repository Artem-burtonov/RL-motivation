@echo off
echo 🎓 Запуск Student Motivation System
echo ================================================

REM Проверяем, что мы в правильной директории
if not exist "backend" (
    echo ❌ Ошибка: Запустите скрипт из корневой директории проекта
    pause
    exit /b 1
)

if not exist "frontend" (
    echo ❌ Ошибка: Запустите скрипт из корневой директории проекта
    pause
    exit /b 1
)

REM Создаем .env файл если его нет
if not exist "backend\.env" (
    echo 📝 Создание .env файла...
    copy "backend\env.example" "backend\.env" >nul
)

REM Активируем виртуальное окружение backend
echo 🐍 Активация виртуального окружения backend...
cd backend
if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate.bat
) else (
    echo ⚠️ Виртуальное окружение не найдено, создаем новое...
    python -m venv venv
    call venv\Scripts\activate.bat
    echo 📦 Установка зависимостей backend...
    pip install -r requirements.txt
)

REM Инициализируем БД
echo 📊 Инициализация базы данных...
python init_db.py

REM Заполняем тестовыми данными
echo 🌱 Заполнение тестовыми данными...
python seed_data.py

REM Запускаем backend в фоне
echo 🚀 Запуск backend сервера...
start "Backend Server" cmd /k "python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

REM Ждем немного
timeout /t 3 /nobreak >nul

REM Переходим в frontend
cd ..\frontend

REM Проверяем зависимости frontend
if not exist "node_modules" (
    echo 📦 Установка зависимостей frontend...
    npm install
)

REM Запускаем frontend
echo 🎨 Запуск frontend приложения...
npm start

pause