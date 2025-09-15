#!/usr/bin/env python3
"""
Скрипт для запуска всего приложения
"""
import subprocess
import sys
import os
import time
import threading
from pathlib import Path

def run_backend():
    """Запускает backend сервер"""
    print("🚀 Запуск backend сервера...")
    backend_dir = Path("backend")
    
    # Активируем виртуальное окружение если оно есть
    venv_python = backend_dir / "venv" / "Scripts" / "python.exe"
    if venv_python.exists():
        python_cmd = str(venv_python)
    else:
        python_cmd = "python"
    
    # Инициализируем БД
    print("📊 Инициализация базы данных...")
    subprocess.run([python_cmd, "init_db.py"], cwd=backend_dir, check=True)
    
    # Заполняем тестовыми данными
    print("🌱 Заполнение тестовыми данными...")
    subprocess.run([python_cmd, "seed_data.py"], cwd=backend_dir, check=True)
    
    # Запускаем сервер
    print("🌐 Запуск FastAPI сервера...")
    subprocess.run([python_cmd, "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"], cwd=backend_dir)

def run_frontend():
    """Запускает frontend приложение"""
    print("🎨 Запуск frontend приложения...")
    frontend_dir = Path("frontend")
    
    # Проверяем, установлены ли зависимости
    if not (frontend_dir / "node_modules").exists():
        print("📦 Установка зависимостей frontend...")
        subprocess.run(["npm", "install"], cwd=frontend_dir, check=True)
    
    # Запускаем React приложение
    print("⚛️ Запуск React приложения...")
    subprocess.run(["npm", "start"], cwd=frontend_dir)

def main():
    """Главная функция"""
    print("🎓 Запуск Student Motivation System")
    print("=" * 50)
    
    # Проверяем, что мы в правильной директории
    if not Path("backend").exists() or not Path("frontend").exists():
        print("❌ Ошибка: Запустите скрипт из корневой директории проекта")
        sys.exit(1)
    
    # Создаем .env файл если его нет
    env_file = Path("backend") / ".env"
    if not env_file.exists():
        print("📝 Создание .env файла...")
        env_content = """DATABASE_URL=sqlite:///./student_motivation.db
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
FRONTEND_URL=http://localhost:3000"""
        env_file.write_text(env_content, encoding='utf-8')
    
    try:
        # Запускаем backend в отдельном потоке
        backend_thread = threading.Thread(target=run_backend)
        backend_thread.daemon = True
        backend_thread.start()
        
        # Ждем немного, чтобы backend запустился
        time.sleep(3)
        
        # Запускаем frontend
        run_frontend()
        
    except KeyboardInterrupt:
        print("\n🛑 Остановка приложения...")
    except Exception as e:
        print(f"❌ Ошибка: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()