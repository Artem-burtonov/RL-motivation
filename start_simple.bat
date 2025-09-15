@echo off
echo 🎓 Запуск Student Motivation System
echo ================================================

REM Создаем .env файл
echo 📝 Создание .env файла...
echo DATABASE_URL=sqlite:///./student_motivation.db > backend\.env
echo SECRET_KEY=your-super-secret-key-change-this-in-production >> backend\.env
echo ALGORITHM=HS256 >> backend\.env
echo ACCESS_TOKEN_EXPIRE_MINUTES=30 >> backend\.env
echo FRONTEND_URL=http://localhost:3000 >> backend\.env

REM Переходим в backend
cd backend

REM Создаем виртуальное окружение если его нет
if not exist "venv" (
    echo 🐍 Создание виртуального окружения...
    python -m venv venv
)

REM Активируем виртуальное окружение
echo 🐍 Активация виртуального окружения...
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

REM Запускаем сервер
echo 🚀 Запуск сервера...
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

pause