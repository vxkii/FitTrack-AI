const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

/**
 * Reusable HTTP request handler with automatic JSON parsing,
 * HTTP status validation, and network error handling.
 */
const request = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        status: data.status || 'error',
        message: data.message || `Request failed with status ${response.status}`,
        ...data
      };
    }

    return data;
  } catch (error) {
    console.error(`API Network Error [${endpoint}]:`, error);
    return {
      success: false,
      status: 'error',
      message: 'Unable to connect to the server. Please try again.'
    };
  }
};

// --- Backend Health Check ---
export const checkBackend = async () => {
  return await request('/health');
};

// --- Workouts API Clients ---
export const saveWorkoutHistory = async (workoutData) => {
  return await request('/workouts/history', {
    method: 'POST',
    body: JSON.stringify(workoutData)
  });
};

export const getWorkoutHistory = async (userId = "demo-user-123") => {
  return await request(`/workouts/history?userId=${encodeURIComponent(userId)}`);
};

// --- Progress Tracking API Clients ---
export const getProgress = async (userId) => {
  return await request(`/progress?userId=${encodeURIComponent(userId)}`);
};

export const createProgressEntry = async (entryData) => {
  return await request('/progress', {
    method: 'POST',
    body: JSON.stringify(entryData)
  });
};

// --- Goals API Clients ---
export const getGoals = async (userId) => {
  return await request(`/goals?userId=${encodeURIComponent(userId)}`);
};

export const createGoal = async (goalData) => {
  return await request('/goals', {
    method: 'POST',
    body: JSON.stringify(goalData)
  });
};

export const updateGoal = async (goalId, updateData) => {
  return await request(`/goals/${encodeURIComponent(goalId)}`, {
    method: 'PUT',
    body: JSON.stringify(updateData)
  });
};

export const deleteGoal = async (goalId) => {
  return await request(`/goals/${encodeURIComponent(goalId)}`, {
    method: 'DELETE'
  });
};

// --- Nutrition API Clients ---
export const getNutrition = async (userId) => {
  return await request(`/nutrition?userId=${encodeURIComponent(userId)}`);
};

export const addMeal = async (mealData) => {
  return await request('/nutrition/meals', {
    method: 'POST',
    body: JSON.stringify(mealData)
  });
};

export const deleteMeal = async (mealId) => {
  return await request(`/nutrition/meals/${encodeURIComponent(mealId)}`, {
    method: 'DELETE'
  });
};

// --- AI Service API Clients ---
export const getAIWorkoutRecommendations = async (userId) => {
  return await request(`/ai/recommendations?userId=${encodeURIComponent(userId)}`);
};

export const generateAIWorkoutPlan = async (userId, preferences = {}) => {
  return await request('/ai/plan', {
    method: 'POST',
    body: JSON.stringify({ userId, ...preferences })
  });
};

export const getAIProgressAnalysis = async (userId) => {
  return await request(`/ai/progress-analysis?userId=${encodeURIComponent(userId)}`);
};

export const getAINutritionInsights = async (userId) => {
  return await request(`/ai/nutrition-insights?userId=${encodeURIComponent(userId)}`);
};

export const getAIFitnessSummary = async (userId) => {
  return await request(`/ai/summary?userId=${encodeURIComponent(userId)}`);
};