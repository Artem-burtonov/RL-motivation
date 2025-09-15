// Test script to verify goal and course creation functionality
const axios = require('axios');

const BASE_URL = 'http://localhost:8000';

async function testGoalCreation() {
    console.log('Testing goal creation...');
    
    const goalData = {
        title: 'Test Goal',
        description: 'This is a test goal',
        goal_type: 'daily',
        target_value: 5,
        points_reward: 50,
        due_date: '2025-09-20'
    };
    
    try {
        const response = await axios.post(`${BASE_URL}/goals`, goalData);
        console.log('✅ Goal created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Goal creation failed:', error.response?.data || error.message);
        return null;
    }
}

async function testCourseCreation() {
    console.log('Testing course creation...');
    
    const courseData = {
        title: 'Test Course',
        description: 'This is a test course',
        duration_hours: 10,
        max_points: 100,
        difficulty_level: 'intermediate'
    };
    
    try {
        const response = await axios.post(`${BASE_URL}/courses`, courseData);
        console.log('✅ Course created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Course creation failed:', error.response?.data || error.message);
        return null;
    }
}

async function testGetGoals() {
    console.log('Testing goals retrieval...');
    
    try {
        const response = await axios.get(`${BASE_URL}/goals?user_id=1`);
        console.log('✅ Goals retrieved successfully. Count:', response.data.length);
        return response.data;
    } catch (error) {
        console.error('❌ Goals retrieval failed:', error.response?.data || error.message);
        return null;
    }
}

async function testGetCourses() {
    console.log('Testing courses retrieval...');
    
    try {
        const response = await axios.get(`${BASE_URL}/courses`);
        console.log('✅ Courses retrieved successfully. Count:', response.data.length);
        return response.data;
    } catch (error) {
        console.error('❌ Courses retrieval failed:', error.response?.data || error.message);
        return null;
    }
}

async function runTests() {
    console.log('🚀 Starting API tests...\n');
    
    // Test goal creation
    const goal = await testGoalCreation();
    
    // Test course creation
    const course = await testCourseCreation();
    
    // Test retrieval
    await testGetGoals();
    await testGetCourses();
    
    console.log('\n🏁 Tests completed!');
}

// Run the tests
runTests().catch(console.error);