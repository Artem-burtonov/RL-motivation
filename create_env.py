#!/usr/bin/env python3
"""
Скрипт для создания .env файла
"""
import os

def create_env_file():
    """Создает .env файл с правильными настройками"""
    env_content = """DATABASE_URL=sqlite:///./student_motivation.db
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
FRONTEND_URL=http://localhost:3000"""
    
    env_path = os.path.join("backend", ".env")
    
    try:
        with open(env_path, 'w', encoding='utf-8') as f:
            f.write(env_content)
        print(f"✅ .env файл создан: {env_path}")
        return True
    except Exception as e:
        print(f"❌ Ошибка при создании .env файла: {e}")
        return False

if __name__ == "__main__":
    create_env_file()
