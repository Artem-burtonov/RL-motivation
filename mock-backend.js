const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// Mock database
let users = [];
let goals = [];
let achievements = [];
let notifications = [];
let userProgress = [];
let courses = [];
let lessons = [];
let courseProgress = [];
let lessonProgress = [];
let userCounter = 1;
let goalCounter = 1;
let achievementCounter = 1;
let notificationCounter = 1;
let courseCounter = 1;
let lessonCounter = 1;
let progressCounter = 1;

// Achievement definitions
const achievementDefinitions = [
  { id: 1, name: 'Первые шаги', description: 'Зарегистрировались в системе', points_reward: 10, type: 'registration' },
  { id: 2, name: 'Первая цель', description: 'Создали первую цель', points_reward: 25, type: 'first_goal' },
  { id: 3, name: 'Мотиватор', description: 'Завершили первую цель', points_reward: 50, type: 'first_goal_complete' },
  { id: 4, name: 'На потоке', description: 'Поддерживали стрик 3 дня', points_reward: 30, type: 'streak_3' },
  { id: 5, name: 'Посвященный', description: 'Поддерживали стрик 7 дней', points_reward: 75, type: 'streak_7' },
  { id: 6, name: 'Легенда', description: 'Поддерживали стрик 30 дней', points_reward: 200, type: 'streak_30' },
  { id: 7, name: 'Ежедневный визит', description: 'Посещали платформу сегодня', points_reward: 5, type: 'daily_visit' },
  { id: 8, name: 'Покоритель целей', description: 'Завершили 5 целей', points_reward: 100, type: 'goals_5' },
  { id: 9, name: 'Мастер мотивации', description: 'Достигли 2 уровня', points_reward: 150, type: 'level_2' },
  { id: 10, name: 'Эксперт', description: 'Достигли 5 уровня', points_reward: 500, type: 'level_5' }
];

// Helper functions
function calculateLevel(points) {
  return Math.floor(points / 1000) + 1;
}

// Initialize default courses and lessons
function initializeCoursesAndLessons() {
  const defaultCourses = [
    {
      id: 1,
      title: 'Основы веб-разработки',
      description: 'Изучите HTML, CSS и JavaScript с нуля',
      difficulty_level: 'beginner',
      duration_hours: 40,
      category: 'Программирование',
      thumbnail_url: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400',
      max_points: 500,
      completion_bonus: 100,
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: 'React для начинающих',
      description: 'Создавайте интерактивные веб-приложения с React',
      difficulty_level: 'intermediate',
      duration_hours: 35,
      category: 'Фронтенд',
      thumbnail_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
      max_points: 750,
      completion_bonus: 150,
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      title: 'Node.js и Backend',
      description: 'Серверная разработка с Node.js и Express',
      difficulty_level: 'advanced',
      duration_hours: 45,
      category: 'Бэкенд',
      thumbnail_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
      max_points: 900,
      completion_bonus: 200,
      is_active: true,
      created_at: new Date().toISOString()
    }
  ];

  const defaultLessons = [
    // Уроки для курса "Основы веб-разработки"
    { id: 1, course_id: 1, title: 'Введение в HTML', description: 'Основы разметки', order: 1, points: 20, duration_minutes: 60 },
    { id: 2, course_id: 1, title: 'CSS стили', description: 'Стилизация веб-страниц', order: 2, points: 25, duration_minutes: 90 },
    { id: 3, course_id: 1, title: 'JavaScript основы', description: 'Программирование для веба', order: 3, points: 30, duration_minutes: 120 },
    { id: 4, course_id: 1, title: 'Responsive дизайн', description: 'Адаптивная верстка', order: 4, points: 35, duration_minutes: 100 },
    { id: 5, course_id: 1, title: 'Финальный проект', description: 'Создание полноценного сайта', order: 5, points: 50, duration_minutes: 180 },

    // Уроки для курса "React для начинающих"
    { id: 6, course_id: 2, title: 'Что такое React', description: 'Введение в библиотеку', order: 1, points: 30, duration_minutes: 75 },
    { id: 7, course_id: 2, title: 'Компоненты', description: 'Создание React компонентов', order: 2, points: 40, duration_minutes: 90 },
    { id: 8, course_id: 2, title: 'State и Props', description: 'Управление состоянием', order: 3, points: 45, duration_minutes: 120 },
    { id: 9, course_id: 2, title: 'Hooks', description: 'Современные хуки React', order: 4, points: 50, duration_minutes: 110 },
    { id: 10, course_id: 2, title: 'Роутинг', description: 'Навигация в приложении', order: 5, points: 40, duration_minutes: 85 },

    // Уроки для курса "Node.js и Backend"
    { id: 11, course_id: 3, title: 'Основы Node.js', description: 'Серверный JavaScript', order: 1, points: 40, duration_minutes: 100 },
    { id: 12, course_id: 3, title: 'Express.js', description: 'Веб-фреймворк для Node.js', order: 2, points: 50, duration_minutes: 120 },
    { id: 13, course_id: 3, title: 'Базы данных', description: 'Работа с MongoDB', order: 3, points: 60, duration_minutes: 150 },
    { id: 14, course_id: 3, title: 'API разработка', description: 'RESTful API и GraphQL', order: 4, points: 70, duration_minutes: 140 },
    { id: 15, course_id: 3, title: 'Деплой приложения', description: 'Публикация на сервере', order: 5, points: 80, duration_minutes: 110 }
  ];

  courses.push(...defaultCourses);
  lessons.push(...defaultLessons);
  courseCounter = defaultCourses.length + 1;
  lessonCounter = defaultLessons.length + 1;
}

// Initialize data
initializeCoursesAndLessons();

function awardAchievement(userId, type) {
  const achievement = achievementDefinitions.find(a => a.type === type);
  if (!achievement) return null;
  
  // Check if user already has this achievement
  const existingAchievement = achievements.find(a => a.user_id === userId && a.achievement_id === achievement.id);
  if (existingAchievement) return null;
  
  // Award achievement
  const userAchievement = {
    id: achievementCounter++,
    user_id: userId,
    achievement_id: achievement.id,
    name: achievement.name,
    description: achievement.description,
    points_reward: achievement.points_reward,
    is_unlocked: true,
    unlocked_at: new Date().toISOString(),
    type: achievement.type
  };
  
  achievements.push(userAchievement);
  
  // Add points to user
  const user = users.find(u => u.id === userId);
  if (user) {
    const oldLevel = user.level;
    user.total_points += achievement.points_reward;
    user.level = calculateLevel(user.total_points);
    
    // Check for level achievements
    if (user.level !== oldLevel) {
      addNotification(userId, 'level_up', 'Новый уровень!', `Поздравляем! Вы достигли ${user.level} уровня!`);
      
      // Award level achievements
      if (user.level === 2) {
        awardAchievement(userId, 'level_2');
      } else if (user.level === 5) {
        awardAchievement(userId, 'level_5');
      }
    }
  }
  
  // Create notification
  addNotification(userId, 'achievement', `Получено достижение: ${achievement.name}!`, achievement.description);
  
  return userAchievement;
}

function addNotification(userId, type, title, message) {
  const notification = {
    id: notificationCounter++,
    user_id: userId,
    type: type,
    notification_type: type, // Add notification_type for frontend compatibility
    title: title,
    message: message,
    is_read: false,
    is_sent: true,
    priority: 1,
    created_at: new Date().toISOString()
  };
  
  notifications.push(notification);
  return notification;
}

function checkDailyAchievements(userId) {
  const today = new Date().toDateString();
  const user = users.find(u => u.id === userId);
  if (!user) return;
  
  // Check if user already got daily visit achievement today
  const todayVisit = achievements.find(a => 
    a.user_id === userId && 
    a.achievement_id === 7 && 
    new Date(a.unlocked_at).toDateString() === today
  );
  
  if (!todayVisit) {
    awardAchievement(userId, 'daily_visit');
  }
}

function updateStreak(userId) {
  const user = users.find(u => u.id === userId);
  if (!user) return;
  
  const today = new Date();
  const lastVisit = user.last_visit ? new Date(user.last_visit) : null;
  
  if (!lastVisit) {
    // First visit
    user.streak_days = 1;
    user.last_visit = today.toISOString();
    addNotification(userId, 'streak_start', 'Начало стрика!', 'Поздравляем с началом стрика! Посещайте платформу каждый день!');
  } else {
    const daysDiff = Math.floor((today - lastVisit) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 0) {
      // Same day visit, no change needed
      return;
    } else if (daysDiff === 1) {
      // Consecutive day
      user.streak_days += 1;
      user.last_visit = today.toISOString();
      
      // Streak milestone notifications
      if (user.streak_days === 3) {
        awardAchievement(userId, 'streak_3');
        addNotification(userId, 'streak_milestone', '🔥 3 дня подряд!', 'Отлично! Вы поддерживаете стрик 3 дня!');
      } else if (user.streak_days === 7) {
        awardAchievement(userId, 'streak_7');
        addNotification(userId, 'streak_milestone', '🔥 Неделя подряд!', 'Невероятно! Целая неделя ежедневных посещений!');
      } else if (user.streak_days === 30) {
        awardAchievement(userId, 'streak_30');
        addNotification(userId, 'streak_milestone', '🔥 Месяц подряд!', 'Легендарно! Целый месяц ежедневной мотивации!');
      } else if (user.streak_days % 5 === 0 && user.streak_days > 0) {
        // Every 5 days milestone
        addNotification(userId, 'streak_motivation', '🔥 Отличный стрик!', `Вы поддерживаете стрик уже ${user.streak_days} дней! Продолжайте в том же духе!`);
      }
    } else if (daysDiff > 1) {
      // Streak broken
      const previousStreak = user.streak_days;
      if (previousStreak > 0) {
        addNotification(userId, 'streak_broken', '⚠️ Стрик прерван', `Ваш стрик в ${previousStreak} дней прерван. Пропущено: ${daysDiff - 1} дней. Начните новый стрик!`);
      }
      user.streak_days = 1;
      user.last_visit = today.toISOString();
      
      // Motivation after streak break
      addNotification(userId, 'streak_restart', '🚀 Новый старт!', 'Не расстраивайтесь! Каждый день - новая возможность. Начните снова!');
    }
  }
}
app.get('/', (req, res) => {
  res.json({ 
    message: 'RL Motivation API is running!', 
    status: 'ok',
    version: '1.0.0'
  });
});

// Auth endpoints
app.post('/auth/register', (req, res) => {
  const { email, username, password, full_name } = req.body;
  
  // Validation
  if (!email || !username || !password || !full_name) {
    return res.status(400).json({ detail: 'Все поля обязательны для заполнения' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ detail: 'Пароль должен быть не менее 6 символов' });
  }
  
  // Check if user exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ detail: 'Пользователь с таким email уже существует' });
  }
  
  // Create user
  const user = {
    id: userCounter++,
    email,
    username,
    full_name,
    total_points: 0,
    level: 1,
    streak_days: 0
  };
  
  users.push(user);
  
  res.json({
    access_token: `mock_token_${user.id}`,
    token_type: 'bearer',
    user
  });
});

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Validation
  if (!email || !password) {
    return res.status(400).json({ detail: 'Email и пароль обязательны' });
  }
  
  // Find user
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ detail: 'Неверный email или пароль' });
  }
  
  // Update streak and check achievements on login
  updateStreak(user.id);
  checkDailyAchievements(user.id);
  
  res.json({
    access_token: `mock_token_${user.id}`,
    token_type: 'bearer',
    user
  });
});

// User endpoints
app.get('/users/me', (req, res) => {
  const userId = 1; // Mock user ID
  let user = users.find(u => u.id === userId);
  
  if (!user) {
    // Create default user if doesn't exist
    user = {
      id: userId,
      email: 'test@example.com',
      username: 'testuser',
      full_name: 'Test User',
      total_points: 150,
      level: 1,
      streak_days: 3,
      last_visit: new Date().toISOString()
    };
    users.push(user);
    
    // Award registration achievement
    awardAchievement(userId, 'registration');
  }
  
  // Update streak and check daily achievements
  updateStreak(userId);
  checkDailyAchievements(userId);
  
  // Check level achievements
  if (user.level >= 2) awardAchievement(userId, 'level_2');
  if (user.level >= 5) awardAchievement(userId, 'level_5');
  
  res.json(user);
});

app.get('/users/me/stats', (req, res) => {
  res.json({
    total_points: 150,
    level: 1,
    streak_days: 3,
    goals_completed: 2,
    achievements_unlocked: 1,
    courses_enrolled: 1
  });
});

// Other endpoints
// Goals endpoints
app.post('/goals', (req, res) => {
  const { course_id, title, description, goal_type, due_date, target_value, points_reward } = req.body;
  const userId = 1; // Mock user ID
  
  // Validation
  if (!title) {
    return res.status(400).json({ detail: 'Название цели обязательно' });
  }
  
  // Create goal
  const goal = {
    id: goalCounter++,
    user_id: userId,
    course_id: course_id || 0,
    title,
    description: description || '',
    goal_type: goal_type || 'daily',
    target_value: target_value || 1,
    current_value: 0,
    points_reward: points_reward || 10,
    status: 'in_progress',
    is_achieved: false,
    progress_percentage: 0,
    due_date: due_date || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  goals.push(goal);
  
  // Award first goal achievement
  if (goals.filter(g => g.user_id === userId).length === 1) {
    awardAchievement(userId, 'first_goal');
  }
  
  res.json(goal);
});

app.get('/goals', (req, res) => {
  const userId = 1; // Mock user ID
  const userGoals = goals.filter(g => g.user_id === userId);
  res.json(userGoals);
});

app.get('/goals/active', (req, res) => {
  const userId = 1; // Mock user ID
  const activeGoals = goals.filter(g => g.user_id === userId && g.status === 'in_progress');
  res.json(activeGoals);
});

app.put('/goals/:goalId', (req, res) => {
  const goalId = parseInt(req.params.goalId);
  const { title, description, target_value, current_value } = req.body;
  
  const goal = goals.find(g => g.id === goalId);
  if (!goal) {
    return res.status(404).json({ detail: 'Цель не найдена' });
  }
  
  // Update goal
  if (title) goal.title = title;
  if (description) goal.description = description;
  if (target_value) goal.target_value = target_value;
  if (current_value !== undefined) {
    goal.current_value = current_value;
    goal.progress_percentage = Math.min((current_value / goal.target_value) * 100, 100);
    
    // Check if goal is completed
    if (current_value >= goal.target_value && !goal.is_achieved) {
      goal.is_achieved = true;
      goal.status = 'completed';
      
      // Award points
      const user = users.find(u => u.id === goal.user_id);
      if (user) {
        user.total_points += goal.points_reward;
        user.level = calculateLevel(user.total_points);
      }
      
      // Award achievement for first completed goal
      const completedGoals = goals.filter(g => g.user_id === goal.user_id && g.is_achieved);
      if (completedGoals.length === 1) {
        awardAchievement(goal.user_id, 'first_goal_complete');
      }
      if (completedGoals.length === 5) {
        awardAchievement(goal.user_id, 'goals_5');
      }
      
      // Motivational notification
      addNotification(goal.user_id, 'success', 'Цель достигнута!', `Поздравляем! Вы завершили цель "${goal.title}" и получили ${goal.points_reward} очков!`);
    }
  }
  
  goal.updated_at = new Date().toISOString();
  res.json(goal);
});

app.post('/goals/:goalId/complete', (req, res) => {
  const goalId = parseInt(req.params.goalId);
  
  const goal = goals.find(g => g.id === goalId);
  if (!goal) {
    return res.status(404).json({ detail: 'Цель не найдена' });
  }
  
  goal.is_achieved = true;
  goal.status = 'completed';
  goal.current_value = goal.target_value;
  goal.progress_percentage = 100;
  goal.updated_at = new Date().toISOString();
  
  // Award points
  const user = users.find(u => u.id === goal.user_id);
  if (user) {
    user.total_points += goal.points_reward;
    user.level = calculateLevel(user.total_points);
  }
  
  res.json(goal);
});

app.delete('/goals/:goalId', (req, res) => {
  const goalId = parseInt(req.params.goalId);
  const goalIndex = goals.findIndex(g => g.id === goalId);
  
  if (goalIndex === -1) {
    return res.status(404).json({ detail: 'Цель не найдена' });
  }
  
  goals.splice(goalIndex, 1);
  res.json({ message: 'Цель удалена' });
});

app.get('/achievements', (req, res) => {
  const userId = 1; // Mock user ID
  const userAchievements = achievements.filter(a => a.user_id === userId);
  res.json(userAchievements);
});

app.get('/progress', (req, res) => {
  const userId = 1; // Mock user ID
  const userCourseProgress = courseProgress.filter(cp => cp.user_id === userId);
  res.json(userCourseProgress);
});

app.get('/courses', (req, res) => {
  const coursesWithStats = courses.map(course => {
    const courseLessons = lessons.filter(l => l.course_id === course.id);
    return {
      ...course,
      total_lessons: courseLessons.length,
      total_duration: courseLessons.reduce((sum, lesson) => sum + lesson.duration_minutes, 0)
    };
  });
  res.json(coursesWithStats);
});

app.get('/courses/:courseId', (req, res) => {
  const courseId = parseInt(req.params.courseId);
  const course = courses.find(c => c.id === courseId);
  
  if (!course) {
    return res.status(404).json({ detail: 'Курс не найден' });
  }
  
  const courseLessons = lessons.filter(l => l.course_id === courseId).sort((a, b) => a.order - b.order);
  
  res.json({
    ...course,
    lessons: courseLessons,
    total_lessons: courseLessons.length
  });
});

app.post('/courses/:courseId/enroll', (req, res) => {
  const courseId = parseInt(req.params.courseId);
  const userId = 1; // Mock user ID
  
  const course = courses.find(c => c.id === courseId);
  if (!course) {
    return res.status(404).json({ detail: 'Курс не найден' });
  }
  
  // Check if already enrolled
  const existingProgress = courseProgress.find(cp => cp.user_id === userId && cp.course_id === courseId);
  if (existingProgress) {
    return res.status(400).json({ detail: 'Вы уже записаны на этот курс' });
  }
  
  // Create course progress
  const progress = {
    id: progressCounter++,
    user_id: userId,
    course_id: courseId,
    completion_percentage: 0,
    lessons_completed: 0,
    total_lessons: lessons.filter(l => l.course_id === courseId).length,
    time_spent_minutes: 0,
    last_activity: new Date().toISOString(),
    points_earned: 0,
    streak_days: 0,
    is_completed: false,
    created_at: new Date().toISOString()
  };
  
  courseProgress.push(progress);
  
  // Initialize lesson progress for this course
  const courseLessons = lessons.filter(l => l.course_id === courseId);
  courseLessons.forEach(lesson => {
    lessonProgress.push({
      id: progressCounter++,
      user_id: userId,
      lesson_id: lesson.id,
      course_id: courseId,
      is_completed: false,
      completed_at: null,
      time_spent_minutes: 0,
      points_earned: 0
    });
  });
  courseProgress.push(progress);
  
  // Add notification
  addNotification(userId, 'course_enrollment', 'Зачисление на курс', `Вы успешно записались на курс "${course.title}"`);
  
  res.json(progress);
});

app.post('/courses', (req, res) => {
  const { title, description, duration_hours, difficulty_level, category, thumbnail_url, max_points, completion_bonus } = req.body;
  
  // Validation
  if (!title || !description) {
    return res.status(400).json({ detail: 'Название и описание обязательны' });
  }
  
  const course = {
    id: courseCounter++,
    title,
    description,
    duration_hours: duration_hours || 10,
    difficulty_level: difficulty_level || 'beginner',
    category: category || 'Общие',
    thumbnail_url: thumbnail_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
    max_points: max_points || 100,
    completion_bonus: completion_bonus || 50,
    is_active: true,
    instructor_id: 1, // Mock instructor
    created_at: new Date().toISOString()
  };
  
  courses.push(course);
  res.json(course);
});

app.put('/courses/:courseId', (req, res) => {
  const courseId = parseInt(req.params.courseId);
  const course = courses.find(c => c.id === courseId);
  
  if (!course) {
    return res.status(404).json({ detail: 'Курс не найден' });
  }
  
  const { title, description, duration_hours, difficulty_level, category, thumbnail_url, max_points, completion_bonus } = req.body;
  
  // Update course
  if (title) course.title = title;
  if (description) course.description = description;
  if (duration_hours) course.duration_hours = duration_hours;
  if (difficulty_level) course.difficulty_level = difficulty_level;
  if (category) course.category = category;
  if (thumbnail_url) course.thumbnail_url = thumbnail_url;
  if (max_points) course.max_points = max_points;
  if (completion_bonus) course.completion_bonus = completion_bonus;
  
  res.json(course);
});

app.post('/courses/:courseId/enroll', (req, res) => {
  const courseId = parseInt(req.params.courseId);
  const userId = 1; // Mock user ID
  
  const course = courses.find(c => c.id === courseId);
  if (!course) {
    return res.status(404).json({ detail: 'Курс не найден' });
  }
  
  // Check if already enrolled
  const existingProgress = courseProgress.find(p => p.user_id === userId && p.course_id === courseId);
  if (existingProgress) {
    return res.status(400).json({ detail: 'Вы уже записаны на этот курс' });
  }
  
  const courseLessons = lessons.filter(l => l.course_id === courseId);
  
  // Create course progress
  const progress = {
    id: progressCounter++,
    user_id: userId,
    course_id: courseId,
    completion_percentage: 0,
    lessons_completed: 0,
    total_lessons: courseLessons.length,
    time_spent_minutes: 0,
    last_activity: new Date().toISOString(),
    points_earned: 0,
    is_completed: false,
    enrolled_at: new Date().toISOString(),
    created_at: new Date().toISOString()
  };
  
  courseProgress.push(progress);
  
  // Award enrollment achievement if first course
  const userCourses = courseProgress.filter(p => p.user_id === userId);
  if (userCourses.length === 1) {
    awardAchievement(userId, 'first_course_enrollment');
  }
  
  addNotification(userId, 'course_enrollment', 'Запись на курс', `Вы записались на курс "${course.title}"!`);
  
  res.json({ message: 'Успешно записаны на курс', progress });
});

// Lesson endpoints
app.get('/courses/:courseId/lessons', (req, res) => {
  const courseId = parseInt(req.params.courseId);
  const userId = 1; // Mock user ID
  
  const courseLessons = lessons.filter(l => l.course_id === courseId).sort((a, b) => a.order - b.order);
  
  // Add completion status for each lesson
  const lessonsWithStatus = courseLessons.map(lesson => {
    const completed = lessonProgress.find(lp => lp.user_id === userId && lp.lesson_id === lesson.id);
    return {
      ...lesson,
      is_completed: !!completed,
      completed_at: completed?.completed_at || null
    };
  });
  
  res.json(lessonsWithStatus);
});

app.post('/lessons/:lessonId/complete', (req, res) => {
  const lessonId = parseInt(req.params.lessonId);
  const userId = 1; // Mock user ID
  
  const lesson = lessons.find(l => l.id === lessonId);
  if (!lesson) {
    return res.status(404).json({ detail: 'Урок не найден' });
  }
  
  // Check if already completed
  const existingProgress = lessonProgress.find(lp => lp.user_id === userId && lp.lesson_id === lessonId);
  if (existingProgress) {
    return res.status(400).json({ detail: 'Урок уже завершен' });
  }
  
  // Mark lesson as completed
  const completion = {
    id: progressCounter++,
    user_id: userId,
    lesson_id: lessonId,
    course_id: lesson.course_id,
    points_earned: lesson.points,
    time_spent_minutes: lesson.duration_minutes,
    completed_at: new Date().toISOString()
  };
  
  lessonProgress.push(completion);
  
  // Award points to user
  const user = users.find(u => u.id === userId);
  if (user) {
    const oldLevel = user.level;
    user.total_points += lesson.points;
    user.level = calculateLevel(user.total_points);
    
    // Check for level up
    if (user.level !== oldLevel) {
      addNotification(userId, 'level_up', 'Новый уровень!', `Поздравляем! Вы достигли ${user.level} уровня!`);
    }
  }
  
  // Update course progress
  const courseProgressRecord = courseProgress.find(cp => cp.user_id === userId && cp.course_id === lesson.course_id);
  if (courseProgressRecord) {
    const courseLessons = lessons.filter(l => l.course_id === lesson.course_id);
    const completedLessons = lessonProgress.filter(lp => 
      lp.user_id === userId && 
      courseLessons.some(cl => cl.id === lp.lesson_id)
    );
    
    courseProgressRecord.lessons_completed = completedLessons.length;
    courseProgressRecord.completion_percentage = (completedLessons.length / courseLessons.length) * 100;
    courseProgressRecord.points_earned = completedLessons.reduce((sum, lp) => {
      const lessonData = lessons.find(l => l.id === lp.lesson_id);
      return sum + (lessonData?.points || 0);
    }, 0);
    courseProgressRecord.last_activity = new Date().toISOString();
    
    // Check if course is completed
    if (courseProgressRecord.completion_percentage >= 100 && !courseProgressRecord.is_completed) {
      courseProgressRecord.is_completed = true;
      courseProgressRecord.completed_at = new Date().toISOString();
      
      // Award completion bonus
      const course = courses.find(c => c.id === lesson.course_id);
      if (course && user) {
        user.total_points += course.completion_bonus;
        user.level = calculateLevel(user.total_points);
        courseProgressRecord.points_earned += course.completion_bonus;
      }
      
      addNotification(userId, 'course_completion', 'Курс завершен!', `Поздравляем! Вы завершили курс "${course?.title}"!`);
      
      // Award course completion achievement
      const completedCourses = courseProgress.filter(cp => cp.user_id === userId && cp.is_completed);
      if (completedCourses.length === 1) {
        awardAchievement(userId, 'first_course_complete');
      }
    }
  }
  
  addNotification(userId, 'lesson_completion', 'Урок завершен!', `Вы завершили урок "${lesson.title}" и получили ${lesson.points} очков!`);
  
  res.json({ 
    message: 'Урок успешно завершен!', 
    points_earned: lesson.points,
    completion 
  });
});

app.get('/notifications', (req, res) => {
  const userId = 1; // Mock user ID
  const userNotifications = notifications.filter(n => n.user_id === userId)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  res.json(userNotifications);
});

app.put('/notifications/:notificationId/read', (req, res) => {
  const notificationId = parseInt(req.params.notificationId);
  const notification = notifications.find(n => n.id === notificationId);
  
  if (!notification) {
    return res.status(404).json({ detail: 'Уведомление не найдено' });
  }
  
  notification.is_read = true;
  res.json({ message: 'Уведомление отмечено как прочитанное' });
});

app.get('/leaderboard', (req, res) => {
  // Sort users by total points and create leaderboard
  const leaderboard = users
    .sort((a, b) => {
      // Primary sort: total points (descending)
      if (b.total_points !== a.total_points) {
        return b.total_points - a.total_points;
      }
      // Secondary sort: level (descending)
      if (b.level !== a.level) {
        return b.level - a.level;
      }
      // Tertiary sort: streak days (descending)
      return (b.streak_days || 0) - (a.streak_days || 0);
    })
    .map((user, index) => ({
      user_id: user.id,
      username: user.username,
      full_name: user.full_name,
      total_points: user.total_points,
      level: user.level,
      rank: index + 1,
      streak_days: user.streak_days || 0,
      completion_rate: Math.floor(Math.random() * 30 + 70), // Mock completion rate
      avatar_url: null // Mock avatar
    }));
  
  res.json(leaderboard);
});

// Smart notification endpoints
app.post('/notifications/motivational', (req, res) => {
  const { type, data } = req.body;
  const userId = 1; // Mock user ID
  
  // Create motivational notification based on type
  let title, message;
  
  switch (type) {
    case 'streak_reminder':
      title = '🔥 Не прерывай серию!';
      message = `У тебя уже ${data?.streakDays || 0} дней подряд! Продолжай в том же духе!`;
      break;
    case 'achievement_unlock':
      title = '🏆 Новое достижение!';
      message = `Поздравляем! Ты разблокировал "${data?.achievementName}"`;
      break;
    case 'goal_reminder':
      title = '🎯 Время для целей!';
      message = data?.hasActiveGoals 
        ? 'У тебя есть незавершенные цели. Время поработать над ними!'
        : 'Поставь себе новую цель и начни её достигать!';
      break;
    case 'daily_encouragement':
      title = '💪 Ты можешь это сделать!';
      const encouragements = [
        'Каждый шаг приближает тебя к цели!',
        'Ты на правильном пути к успеху!',
        'Твоя настойчивость обязательно принесет плоды!',
        'Сегодня отличный день для новых достижений!',
        'Ты становишься лучше с каждым днем!'
      ];
      message = encouragements[Math.floor(Math.random() * encouragements.length)];
      break;
    case 'study_break':
      title = '☕ Время отдыха!';
      message = 'Ты отлично работаешь! Сделай небольшой перерыв и продолжай с новыми силами.';
      break;
    default:
      title = '📢 Уведомление';
      message = 'У нас есть для тебя сообщение!';
  }
  
  const notification = {
    id: notifications.length + 1,
    user_id: userId,
    title,
    message,
    type: 'motivational',
    notification_type: 'motivational', // Add notification_type for frontend compatibility
    is_read: false,
    is_sent: true,
    priority: 1,
    created_at: new Date().toISOString()
  };
  
  notifications.push(notification);
  res.json(notification);
});

// Get user behavior patterns for smart notifications
app.get('/users/behavior-patterns', (req, res) => {
  const userId = 1; // Mock user ID
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ detail: 'Пользователь не найден' });
  }
  
  const userGoals = goals.filter(g => g.user_id === userId);
  const activeGoals = userGoals.filter(g => !g.is_completed);
  
  const patterns = {
    current_streak: user.current_streak || 0,
    has_active_goals: activeGoals.length > 0,
    total_goals: userGoals.length,
    completed_goals: userGoals.filter(g => g.is_completed).length,
    last_login: user.last_login || new Date().toISOString(),
    total_points: user.total_points,
    level: user.level
  };
  
  res.json(patterns);
});

// Daily achievements endpoints
app.post('/achievements/check-daily', (req, res) => {
  const userId = 1; // Mock user ID
  
  // Update streak and check daily achievements
  updateStreak(userId);
  checkDailyAchievements(userId);
  
  const user = users.find(u => u.id === userId);
  const todayAchievements = achievements.filter(a => 
    a.user_id === userId && 
    new Date(a.unlocked_at).toDateString() === new Date().toDateString()
  );
  
  res.json({
    streak_days: user?.streak_days || 0,
    daily_achievements: todayAchievements,
    total_points_today: todayAchievements.reduce((sum, a) => sum + a.points_reward, 0)
  });
});

app.get('/achievements/daily', (req, res) => {
  const userId = 1; // Mock user ID
  const today = new Date().toDateString();
  
  // Get all daily achievement types and their status
  const dailyAchievementTypes = ['daily_visit', 'streak_3', 'streak_7', 'streak_30'];
  const dailyAchievements = dailyAchievementTypes.map(type => {
    const definition = achievementDefinitions.find(a => a.type === type);
    const userAchievement = achievements.find(a => 
      a.user_id === userId && 
      a.achievement_id === definition.id && 
      (type === 'daily_visit' ? new Date(a.unlocked_at).toDateString() === today : true)
    );
    
    return {
      ...definition,
      is_earned_today: type === 'daily_visit' ? !!userAchievement : false,
      is_unlocked: !!userAchievement,
      progress: type.includes('streak') ? 
        (users.find(u => u.id === userId)?.streak_days || 0) : 
        (type === 'daily_visit' ? (userAchievement ? 1 : 0) : 0),
      required: type === 'streak_3' ? 3 : 
               type === 'streak_7' ? 7 : 
               type === 'streak_30' ? 30 : 1
    };
  });
  
  res.json(dailyAchievements);
});

// Points and ranking endpoints
app.get('/users/ranking', (req, res) => {
  const userId = 1; // Mock user ID
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ detail: 'Пользователь не найден' });
  }
  
  // Calculate user's rank
  const sortedUsers = users
    .sort((a, b) => {
      if (b.total_points !== a.total_points) {
        return b.total_points - a.total_points;
      }
      if (b.level !== a.level) {
        return b.level - a.level;
      }
      return (b.streak_days || 0) - (a.streak_days || 0);
    });
  
  const userRank = sortedUsers.findIndex(u => u.id === userId) + 1;
  const totalUsers = users.length;
  
  // Calculate points until next level
  const currentLevel = user.level;
  const pointsForNextLevel = currentLevel * 1000;
  const pointsNeeded = Math.max(0, pointsForNextLevel - user.total_points);
  
  // Find users above and below in ranking
  const userAbove = userRank > 1 ? sortedUsers[userRank - 2] : null;
  const userBelow = userRank < totalUsers ? sortedUsers[userRank] : null;
  
  res.json({
    current_rank: userRank,
    total_users: totalUsers,
    percentile: Math.round(((totalUsers - userRank + 1) / totalUsers) * 100),
    points_to_next_level: pointsNeeded,
    next_level: currentLevel + 1,
    user_above: userAbove ? {
      username: userAbove.username,
      full_name: userAbove.full_name,
      total_points: userAbove.total_points,
      points_difference: userAbove.total_points - user.total_points
    } : null,
    user_below: userBelow ? {
      username: userBelow.username,
      full_name: userBelow.full_name,
      total_points: userBelow.total_points,
      points_difference: user.total_points - userBelow.total_points
    } : null
  });
});

// Streak tracking endpoints
app.get('/users/streak', (req, res) => {
  const userId = 1; // Mock user ID
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ detail: 'Пользователь не найден' });
  }
  
  const today = new Date();
  const lastVisit = user.last_visit ? new Date(user.last_visit) : null;
  const daysSinceLastVisit = lastVisit ? Math.floor((today - lastVisit) / (1000 * 60 * 60 * 24)) : 0;
  
  // Calculate streak risk
  let riskLevel = 'safe';
  let riskMessage = 'Всё отлично!';
  
  if (daysSinceLastVisit === 0) {
    riskLevel = 'safe';
    riskMessage = 'Вы уже посетили платформу сегодня!';
  } else if (daysSinceLastVisit === 1) {
    riskLevel = 'warning';
    riskMessage = 'Осторожно! Стрик может прерваться завтра.';
  } else if (daysSinceLastVisit > 1) {
    riskLevel = 'danger';
    riskMessage = `Стрик прерван! Пропущено ${daysSinceLastVisit} дней.`;
  }
  
  // Next milestones
  const nextMilestones = [];
  const current = user.streak_days || 0;
  const milestones = [3, 7, 14, 30, 60, 100, 365];
  
  for (const milestone of milestones) {
    if (milestone > current) {
      nextMilestones.push({
        days: milestone,
        days_remaining: milestone - current,
        reward_points: milestone >= 30 ? 200 : milestone >= 7 ? 75 : 30
      });
      if (nextMilestones.length >= 3) break;
    }
  }
  
  res.json({
    current_streak: user.streak_days || 0,
    last_visit: user.last_visit,
    days_since_last_visit: daysSinceLastVisit,
    risk_level: riskLevel,
    risk_message: riskMessage,
    next_milestones: nextMilestones,
    streak_history: [] // Could be implemented to track historical streaks
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 RL Motivation Backend running at http://localhost:${port}`);
  console.log(`📝 Available endpoints:`);
  console.log(`   GET  / - API status`);
  console.log(`   POST /auth/register - User registration`);
  console.log(`   POST /auth/login - User login`);
  console.log(`   GET  /users/me - Current user info`);
  console.log(`✅ Ready to handle requests!`);
});

module.exports = app;