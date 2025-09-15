@echo off
echo 🎨 Запуск Frontend приложения
echo ================================================

REM Переходим в frontend
cd frontend

REM Устанавливаем зависимости если их нет
if not exist "node_modules" (
    echo 📦 Установка зависимостей frontend...
    npm install
)

REM Запускаем React приложение
echo ⚛️ Запуск React приложения...
npm start

pause
