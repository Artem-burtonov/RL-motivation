#!/usr/bin/env python3
"""
Simple script to test backend functionality without dependencies
"""
import sys
import os
import json
from pathlib import Path

def check_python():
    """Check Python version"""
    print(f"✅ Python {sys.version}")
    return True

def check_backend_files():
    """Check if backend files exist"""
    backend_dir = Path("backend")
    required_files = [
        "app/main.py",
        "app/database.py", 
        "app/services/auth_service.py",
        "requirements.txt"
    ]
    
    for file in required_files:
        file_path = backend_dir / file
        if file_path.exists():
            print(f"✅ {file}")
        else:
            print(f"❌ {file} not found")
            return False
    return True

def create_simple_backend():
    """Create a simple mock backend for testing"""
    
    simple_backend = '''
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

# Simple models
class UserLogin(BaseModel):
    email: str
    password: str

class UserCreate(BaseModel):
    email: str
    username: str
    password: str
    full_name: str

class User(BaseModel):
    id: int
    email: str
    username: str
    full_name: str
    total_points: int = 0
    level: int = 1
    streak_days: int = 0

# Create app
app = FastAPI(title="EduMotiv API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock database
users_db = {}
user_counter = 1

@app.get("/")
async def root():
    return {"message": "EduMotiv API is running!", "status": "ok"}

@app.post("/auth/register")
async def register(user_data: UserCreate):
    global user_counter
    
    # Check if user exists
    for user in users_db.values():
        if user["email"] == user_data.email:
            raise HTTPException(status_code=400, detail="Пользователь с таким email уже существует")
    
    # Create user
    user = {
        "id": user_counter,
        "email": user_data.email,
        "username": user_data.username,
        "full_name": user_data.full_name,
        "total_points": 0,
        "level": 1,
        "streak_days": 0
    }
    
    users_db[user_counter] = user
    user_counter += 1
    
    return {
        "access_token": f"mock_token_{user['id']}", 
        "token_type": "bearer", 
        "user": user
    }

@app.post("/auth/login")
async def login(login_data: UserLogin):
    # Mock login - find user by email
    user = None
    for u in users_db.values():
        if u["email"] == login_data.email:
            user = u
            break
    
    if not user:
        raise HTTPException(status_code=401, detail="Неверный email или пароль")
    
    return {
        "access_token": f"mock_token_{user['id']}", 
        "token_type": "bearer", 
        "user": user
    }

@app.get("/users/me")
async def get_current_user():
    # Return first user or create mock user
    if users_db:
        return list(users_db.values())[0]
    else:
        return {
            "id": 1,
            "email": "test@example.com",
            "username": "testuser",
            "full_name": "Test User",
            "total_points": 150,
            "level": 1,
            "streak_days": 3
        }

@app.get("/users/me/stats")
async def get_user_stats():
    return {
        "total_points": 150,
        "level": 1,
        "streak_days": 3,
        "goals_completed": 2,
        "achievements_unlocked": 1,
        "courses_enrolled": 1
    }

@app.get("/goals/active")
async def get_active_goals():
    return []

@app.get("/achievements")
async def get_achievements():
    return []

@app.get("/progress")
async def get_progress():
    return []

@app.get("/courses")
async def get_courses():
    return []

@app.get("/notifications")
async def get_notifications():
    return []

@app.get("/leaderboard")
async def get_leaderboard():
    return []

if __name__ == "__main__":
    print("🚀 Starting EduMotiv Backend...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
'''
    
    # Write simple backend
    with open("simple_backend.py", "w", encoding="utf-8") as f:
        f.write(simple_backend)
    
    print("✅ Created simple_backend.py")
    return True

def main():
    print("🔧 EduMotiv Backend Setup Check")
    print("=" * 50)
    
    # Check Python
    if not check_python():
        return False
    
    # Check backend files
    if not check_backend_files():
        print("⚠️ Some backend files missing, creating simple backend...")
        create_simple_backend()
    
    print()
    print("✅ Setup check complete!")
    print()
    print("To start the backend:")
    print("1. Install FastAPI: pip install fastapi uvicorn")
    print("2. Run: python simple_backend.py")
    print()
    
    return True

if __name__ == "__main__":
    main()