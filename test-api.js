// Test script to debug goal and course creation
const axios = require('axios');

const baseURL = 'http://localhost:8000';

async function testGoalCreation() {
  console.log('Testing goal creation...');
  
  try {
    const goalData = {
      course_id: 1,
      title: 'Test Goal',
      description: 'This is a test goal',
      goal_type: 'daily',
      target_value: 5,
      points_reward: 50
    };
    
    console.log('Sending goal data:', goalData);
    
    const response = await axios.post(`${baseURL}/goals`, goalData);
    console.log('Goal creation success:', response.data);
    
    // Test getting goals
    const getResponse = await axios.get(`${baseURL}/goals`);
    console.log('Current goals:', getResponse.data);
    
  } catch (error) {
    console.error('Goal creation error:', error.response?.data || error.message);
  }
}

async function testCourseCreation() {
  console.log('\nTesting course creation...');
  
  try {
    const courseData = {
      title: 'Test Course',
      description: 'This is a test course',
      duration_hours: 10,
      difficulty_level: 'beginner',
      category: 'Test',
      max_points: 100,
      completion_bonus: 20
    };
    
    console.log('Sending course data:', courseData);
    
    const response = await axios.post(`${baseURL}/courses`, courseData);
    console.log('Course creation success:', response.data);
    
    // Test getting courses
    const getResponse = await axios.get(`${baseURL}/courses`);
    console.log('Current courses:', getResponse.data);
    
  } catch (error) {
    console.error('Course creation error:', error.response?.data || error.message);
  }
}

async function runTests() {
  await testGoalCreation();
  await testCourseCreation();
}

runTests();