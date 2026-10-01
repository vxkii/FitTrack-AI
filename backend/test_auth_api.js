const http = require('http');

// Helper to make HTTP JSON requests
function makeRequest(options, bodyData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, body: json });
        } catch (err) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (bodyData) {
      req.write(JSON.stringify(bodyData));
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- STARTING FITTRACK AI USER SYSTEM, PROFILE, WORKOUT, PROGRESS & GOALS API TESTS ---\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${message}`);
      failed++;
    }
  }

  const testEmail = `testuser_${Date.now()}@example.com`;
  const testPassword = 'SecurePassword123!';
  const testName = 'Test User';

  try {
    // 1. Test Health API
    console.log('[1] Testing Health Endpoint...');
    const healthRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/health',
      method: 'GET'
    });
    assert(healthRes.status === 200 && healthRes.body.success === true, 'Health check API is active');

    // 2. Test User Registration (Success)
    console.log('\n[2] Testing User Registration (Valid Inputs)...');
    const regRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/users/register',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { name: testName, email: testEmail, password: testPassword });

    assert(regRes.status === 201, `Status code is 201 (got ${regRes.status})`);
    assert(regRes.body.success === true, 'Registration response success is true');
    assert(regRes.body.data && regRes.body.data.email === testEmail.toLowerCase(), 'Registered email matches');
    assert(regRes.body.data.passwordHash === undefined, 'CRITICAL: passwordHash is NOT returned in response');
    assert(regRes.body.data.createdAt !== undefined, 'createdAt field exists');
    assert(regRes.body.data.updatedAt !== undefined, 'updatedAt field exists');

    const userId = regRes.body.data.id;

    // 3. Test Duplicate Email Registration
    console.log('\n[3] Testing Duplicate Email Registration...');
    const dupRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/users/register',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { name: 'Duplicate User', email: testEmail, password: 'AnotherPassword123' });

    assert(dupRes.status === 400, `Duplicate registration rejected with status 400 (got ${dupRes.status})`);
    assert(dupRes.body.success === false, 'Duplicate registration response success is false');
    assert(dupRes.body.message.includes('already exists'), 'Appropriate duplicate email error message');

    // 4. Test Invalid Email Registration
    console.log('\n[4] Testing Invalid Email Format Registration...');
    const invalidEmailRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/users/register',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { name: 'Bad Email User', email: 'invalid-email-format', password: 'Password123' });

    assert(invalidEmailRes.status === 400, `Invalid email format rejected with 400 (got ${invalidEmailRes.status})`);

    // 5. Test Short Password Registration
    console.log('\n[5] Testing Short Password Registration...');
    const shortPassRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/users/register',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { name: 'Short Pass User', email: 'shortpass@example.com', password: '123' });

    assert(shortPassRes.status === 400, `Short password rejected with 400 (got ${shortPassRes.status})`);

    // 6. Test Login (Success)
    console.log('\n[6] Testing Login (Valid Credentials)...');
    const loginRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/users/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { email: testEmail, password: testPassword });

    assert(loginRes.status === 200, `Login status code is 200 (got ${loginRes.status})`);
    assert(loginRes.body.success === true, 'Login response success is true');
    assert(loginRes.body.data && loginRes.body.data.email === testEmail.toLowerCase(), 'Login returned user data');
    assert(loginRes.body.data.passwordHash === undefined, 'CRITICAL: passwordHash is NOT returned in login response');

    // 7. Test Login with Incorrect Password
    console.log('\n[7] Testing Login (Incorrect Password)...');
    const wrongPassRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/users/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { email: testEmail, password: 'WrongPassword999!' });

    assert(wrongPassRes.status === 401, `Wrong password rejected with 401 (got ${wrongPassRes.status})`);
    assert(wrongPassRes.body.success === false, 'Response success is false');
    assert(wrongPassRes.body.message === 'Invalid email or password', 'Generic error message for safety');

    // 8. Test Login with Non-existent Email
    console.log('\n[8] Testing Login (Non-existent Email)...');
    const nonExistentRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/users/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { email: 'nonexistent_user_987654@example.com', password: 'SomePassword123' });

    assert(nonExistentRes.status === 401, `Non-existent email rejected with 401 (got ${nonExistentRes.status})`);
    assert(nonExistentRes.body.message === 'Invalid email or password', 'Generic error message for safety');

    // 9. Test Fetch User Profile (GET /api/users/profile?userId=...)
    console.log('\n[9] Testing Fetch User Profile (GET /api/users/profile)...');
    const profileRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: `/api/users/profile?userId=${userId}`,
      method: 'GET'
    });

    assert(profileRes.status === 200, `Fetch profile status code is 200 (got ${profileRes.status})`);
    assert(profileRes.body.success === true, 'Profile response success is true');
    assert(profileRes.body.data && profileRes.body.data.name === testName, 'Fetched profile name matches');
    assert(profileRes.body.data.age !== undefined, 'Profile contains age field');
    assert(profileRes.body.data.height !== undefined, 'Profile contains height field');
    assert(profileRes.body.data.weight !== undefined, 'Profile contains weight field');
    assert(profileRes.body.data.fitnessGoal !== undefined, 'Profile contains fitnessGoal field');
    assert(profileRes.body.data.activityLevel !== undefined, 'Profile contains activityLevel field');
    assert(profileRes.body.data.passwordHash === undefined, 'CRITICAL: passwordHash is NOT returned in profile data');

    // 10. Test Update User Profile (PUT /api/users/profile)
    console.log('\n[10] Testing Update User Profile (PUT /api/users/profile)...');
    const updatePayload = {
      userId,
      name: 'Alex Vance Updated',
      email: testEmail,
      age: 30,
      height: 180,
      weight: 72.5,
      fitnessGoal: 'Lose Weight',
      activityLevel: 'Very Active'
    };

    const updateProfileRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/users/profile',
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    }, updatePayload);

    assert(updateProfileRes.status === 200, `Update profile status code is 200 (got ${updateProfileRes.status})`);
    assert(updateProfileRes.body.success === true, 'Update profile response success is true');
    assert(updateProfileRes.body.data.name === 'Alex Vance Updated', 'Updated profile name matches');
    assert(updateProfileRes.body.data.age === 30, 'Updated age is 30');
    assert(updateProfileRes.body.data.height === 180, 'Updated height is 180');
    assert(updateProfileRes.body.data.weight === 72.5, 'Updated weight is 72.5');
    assert(updateProfileRes.body.data.fitnessGoal === 'Lose Weight', 'Updated fitnessGoal matches');
    assert(updateProfileRes.body.data.activityLevel === 'Very Active', 'Updated activityLevel matches');
    assert(updateProfileRes.body.data.passwordHash === undefined, 'CRITICAL: passwordHash is NOT returned after update');

    // 11. Test Invalid Profile Input Validations
    console.log('\n[11] Testing Invalid Profile Update Validation...');
    const invalidAgeRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/users/profile',
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    }, { userId, age: -10 });

    assert(invalidAgeRes.status === 400, `Negative age rejected with status 400 (got ${invalidAgeRes.status})`);

    // 12. Test Workout History APIs (Ensuring No Regression)
    console.log('\n[12] Testing Workout History APIs (Ensuring No Regression)...');
    const workoutData = {
      userId: userId,
      workoutId: 'full-body-burn',
      workoutName: 'Full Body HIIT Burn',
      exercisesCompleted: 5,
      setsCompleted: 15,
      duration: 1800,
      calories: 320
    };

    const saveWorkoutRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/workouts/history',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, workoutData);

    assert(saveWorkoutRes.status === 201, `Save workout status code is 201 (got ${saveWorkoutRes.status})`);
    assert(saveWorkoutRes.body.success === true, 'Workout history saved successfully');

    const getWorkoutRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: `/api/workouts/history?userId=${userId}`,
      method: 'GET'
    });

    assert(getWorkoutRes.status === 200, `Get workout history status is 200 (got ${getWorkoutRes.status})`);
    assert(getWorkoutRes.body.data && getWorkoutRes.body.data.length > 0, 'Fetched saved workout history');

    // 13. Test Fetch Progress Analytics (GET /api/progress?userId=...)
    console.log('\n[13] Testing Fetch Progress Analytics (GET /api/progress)...');
    const fetchProgressRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: `/api/progress?userId=${userId}`,
      method: 'GET'
    });

    assert(fetchProgressRes.status === 200, `Fetch progress status code is 200 (got ${fetchProgressRes.status})`);
    assert(fetchProgressRes.body.success === true, 'Progress response success is true');

    // 14. Test Create Progress Entry (POST /api/progress)
    console.log('\n[14] Testing Create Progress Entry (POST /api/progress)...');
    const createProgressRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/progress',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      userId,
      weight: 68.2,
      chest: 98,
      waist: 80,
      hips: 95,
      notes: 'Test progress log'
    });

    assert(createProgressRes.status === 201, `Create progress entry status code is 201 (got ${createProgressRes.status})`);
    assert(createProgressRes.body.success === true, 'Create progress entry response success is true');
    assert(createProgressRes.body.data.weight === 68.2, 'Logged weight matches 68.2');

    // 15. Test Create Goal (POST /api/goals)
    console.log('\n[15] Testing Create Goal (POST /api/goals)...');
    const createGoalRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/goals',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      userId,
      name: 'Run 50 km',
      category: 'Workout',
      current: 10,
      target: 50,
      unit: 'km',
      deadline: '2026-10-31',
      description: 'Run 50km this month'
    });

    assert(createGoalRes.status === 201, `Create goal status code is 201 (got ${createGoalRes.status})`);
    assert(createGoalRes.body.success === true, 'Create goal response success is true');
    assert(createGoalRes.body.data.name === 'Run 50 km', 'Created goal name matches');
    assert(createGoalRes.body.data.progress === 20, 'Progress calculated as 20%');
    assert(createGoalRes.body.data.status === 'In Progress', 'Status is In Progress');

    const createdGoalId = createGoalRes.body.data.id || createGoalRes.body.data._id;

    // 16. Test Fetch User Goals (GET /api/goals?userId=...)
    console.log('\n[16] Testing Fetch User Goals (GET /api/goals)...');
    const fetchGoalsRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: `/api/goals?userId=${userId}`,
      method: 'GET'
    });

    assert(fetchGoalsRes.status === 200, `Fetch goals status code is 200 (got ${fetchGoalsRes.status})`);
    assert(fetchGoalsRes.body.success === true, 'Fetch goals response success is true');
    assert(fetchGoalsRes.body.count >= 1, `Fetched goals count is >= 1 (got ${fetchGoalsRes.body.count})`);

    // 17. Test Update Goal Progress & Completion (PUT /api/goals/:id)
    console.log('\n[17] Testing Update Goal Progress & Complete (PUT /api/goals)...');
    const updateGoalRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: `/api/goals/${createdGoalId}`,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    }, { current: 50 });

    assert(updateGoalRes.status === 200, `Update goal status code is 200 (got ${updateGoalRes.status})`);
    assert(updateGoalRes.body.success === true, 'Update goal response success is true');
    assert(updateGoalRes.body.data.progress === 100, 'Progress calculated as 100%');
    assert(updateGoalRes.body.data.status === 'Completed', 'Status automatically updated to Completed');

    // 18. Test Invalid Goal Creation Validation
    console.log('\n[18] Testing Invalid Goal Creation Validation...');
    const invalidGoalRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/goals',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { userId, name: 'Bad Goal', target: 0 });

    assert(invalidGoalRes.status === 400, `Target 0 rejected with status 400 (got ${invalidGoalRes.status})`);

    // 19. Test Delete Goal (DELETE /api/goals/:id)
    console.log('\n[19] Testing Delete Goal (DELETE /api/goals)...');
    const deleteGoalRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: `/api/goals/${createdGoalId}`,
      method: 'DELETE'
    });

    assert(deleteGoalRes.status === 200, `Delete goal status code is 200 (got ${deleteGoalRes.status})`);

    const reFetchGoalsRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: `/api/goals?userId=${userId}`,
      method: 'GET'
    });
    assert(reFetchGoalsRes.body.count === 0, 'Re-fetch goals count is 0 after deletion');

    console.log(`\n========================================`);
    console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log(`========================================\n`);

    if (failed > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }

  } catch (err) {
    console.error('Test execution error:', err);
    process.exit(1);
  }
}

// Give server time to connect to MongoDB if script launched right after
setTimeout(runTests, 1000);
