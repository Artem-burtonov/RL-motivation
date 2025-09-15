@echo off
title Student Motivation System - Финальный запуск
color 0A

echo.
echo  ███████╗██╗███╗   ██╗ █████╗ ██╗         ███████╗████████╗ █████╗ ██████╗ ████████╗
echo  ██╔════╝██║████╗  ██║██╔══██╗██║         ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝
echo  █████╗  ██║██╔██╗ ██║███████║██║         ███████╗   ██║   ███████║██████╔╝   ██║   
echo  ██╔══╝  ██║██║╚██╗██║██╔══██║██║         ╚════██║   ██║   ██╔══██║██╔══██╗   ██║   
echo  ██║     ██║██║ ╚████║██║  ██║███████╗    ███████║   ██║   ██║  ██║██║  ██║   ██║   
echo  ╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝    ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   
echo.
echo  ███╗   ███╗ ██████╗ ████████╗██╗██╗   ██╗ █████╗ ████████╗██╗ ██████╗ ███╗   ██╗
echo  ████╗ ████║██╔═══██╗╚══██╔══╝██║██║   ██║██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║
echo  ██╔████╔██║██║   ██║   ██║   ██║██║   ██║███████║   ██║   ██║██║   ██║██╔██╗ ██║
echo  ██║╚██╔╝██║██║   ██║   ██║   ██║╚██╗ ██╔╝██╔══██║   ██║   ██║██║   ██║██║╚██╗██║
echo  ██║ ╚═╝ ██║╚██████╔╝   ██║   ██║ ╚████╔╝ ██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║
echo  ╚═╝     ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═══╝  ╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
echo.
echo  ================================================================================
echo  🎓 Система мотивации и вовлеченности студентов в онлайн-курсах
echo  ================================================================================
echo.

REM Проверяем Python
echo 🔍 Проверка Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python не найден! Установите Python 3.8+ с https://python.org
    pause
    exit /b 1
)
echo ✅ Python найден

REM Проверяем Node.js
echo 🔍 Проверка Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js не найден! Установите Node.js с https://nodejs.org
    pause
    exit /b 1
)
echo ✅ Node.js найден

REM Создаем .env файл принудительно
echo.
echo 📝 Создание конфигурации...
echo DATABASE_URL=sqlite:///./student_motivation.db > backend\.env
echo SECRET_KEY=your-super-secret-key-change-this-in-production >> backend\.env
echo ALGORITHM=HS256 >> backend\.env
echo ACCESS_TOKEN_EXPIRE_MINUTES=30 >> backend\.env
echo FRONTEND_URL=http://localhost:3000 >> backend\.env
echo ✅ Конфигурация создана

REM Удаляем старую базу данных если есть
echo.
echo 🗑️ Очистка старой базы данных...
if exist "backend\student_motivation.db" (
    del "backend\student_motivation.db"
    echo ✅ Старая база данных удалена
)

REM Запускаем Backend
echo.
echo 🐍 Запуск Backend сервера...
cd backend

REM Создаем виртуальное окружение если его нет
if not exist "venv" (
    echo 📦 Создание виртуального окружения...
    python -m venv venv
)

REM Активируем виртуальное окружение
call venv\Scripts\activate.bat

REM Устанавливаем зависимости
echo 📦 Установка зависимостей...
pip install -r requirements.txt

REM Инициализируем БД
echo 📊 Инициализация базы данных...
python init_db.py

REM Заполняем тестовыми данными
echo 🌱 Заполнение тестовыми данными...
python seed_data.py

REM Запускаем backend в фоне
echo 🚀 Запуск API сервера на http://localhost:8000...
start "Backend Server" cmd /k "call venv\Scripts\activate.bat && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

REM Ждем запуска backend
echo ⏳ Ожидание запуска backend сервера...
timeout /t 5 /nobreak >nul

REM Запускаем Frontend
echo.
echo 🎨 Запуск Frontend приложения...
cd ..\frontend

REM Устанавливаем зависимости frontend
if not exist "node_modules" (
    echo 📦 Установка зависимостей frontend...
    npm install
)

REM Запускаем frontend
echo ⚛️ Запуск React приложения на http://localhost:3000...
start "Frontend App" cmd /k "npm start"

echo.
echo ================================================================================
echo 🎉 Приложение запущено!
echo.
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend API: http://localhost:8000
echo 📚 API Docs: http://localhost:8000/docs
echo.
echo 👤 Тестовый пользователь:
echo    Email: test@example.com
echo    Пароль: testpassword123
echo.
echo ⚠️  Для остановки закройте окна терминалов
echo ================================================================================
echo.

REM Открываем браузер
echo 🌐 Открываем приложение в браузере...
timeout /t 3 /nobreak >nul
start http://localhost:3000

pause
