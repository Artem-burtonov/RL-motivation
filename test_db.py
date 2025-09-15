#!/usr/bin/env python3
"""
Скрипт для тестирования подключения к базе данных
"""
import sys
import os
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), "backend"))

def test_database():
    """Тестирует подключение к базе данных"""
    print("🔧 Тестирование подключения к базе данных...")
    
    try:
        from app.database import settings, engine
        from sqlalchemy import text
        
        print(f"📊 URL базы данных: {settings.database_url}")
        
        # Проверяем подключение
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            print("✅ Подключение к базе данных успешно!")
            
        return True
        
    except Exception as e:
        print(f"❌ Ошибка подключения к базе данных: {e}")
        return False

if __name__ == "__main__":
    success = test_database()
    sys.exit(0 if success else 1)
