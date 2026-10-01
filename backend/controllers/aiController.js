const aiService = require('../services/aiService');

// @desc    Get AI personalized workout recommendations
// @route   POST /api/ai/recommendations or GET /api/ai/recommendations?userId=...
// @access  Authenticated
const getRecommendations = async (req, res) => {
  try {
    const userId = req.query.userId || req.body.userId;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'userId parameter is required' });
    }

    const result = await aiService.getWorkoutRecommendations(userId);
    return res.status(200).json(result);
  } catch (error) {
    console.error('AI Recommendation Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate workout recommendations',
      error: error.message
    });
  }
};

// @desc    Generate AI goal-based workout plan
// @route   POST /api/ai/plan
// @access  Authenticated
const generatePlan = async (req, res) => {
  try {
    const { userId, goal, daysPerWeek } = req.body;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'userId is required' });
    }

    const result = await aiService.generateWorkoutPlan(userId, { goal, daysPerWeek });
    return res.status(200).json(result);
  } catch (error) {
    console.error('AI Workout Plan Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate workout plan',
      error: error.message
    });
  }
};

// @desc    Get AI progress analysis & insights
// @route   GET /api/ai/progress-analysis?userId=...
// @access  Authenticated
const getProgressInsights = async (req, res) => {
  try {
    const userId = req.query.userId || req.body.userId;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'userId parameter is required' });
    }

    const result = await aiService.analyzeProgress(userId);
    return res.status(200).json(result);
  } catch (error) {
    console.error('AI Progress Analysis Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate progress analysis',
      error: error.message
    });
  }
};

// @desc    Get AI nutrition insights
// @route   GET /api/ai/nutrition-insights?userId=...
// @access  Authenticated
const getNutritionInsights = async (req, res) => {
  try {
    const userId = req.query.userId || req.body.userId;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'userId parameter is required' });
    }

    const result = await aiService.analyzeNutrition(userId);
    return res.status(200).json(result);
  } catch (error) {
    console.error('AI Nutrition Insights Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate nutrition insights',
      error: error.message
    });
  }
};

// @desc    Get executive AI fitness summary
// @route   GET /api/ai/summary?userId=...
// @access  Authenticated
const getSummary = async (req, res) => {
  try {
    const userId = req.query.userId || req.body.userId;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'userId parameter is required' });
    }

    const result = await aiService.generateFitnessSummary(userId);
    return res.status(200).json(result);
  } catch (error) {
    console.error('AI Summary Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate fitness summary',
      error: error.message
    });
  }
};

module.exports = {
  getRecommendations,
  generatePlan,
  getProgressInsights,
  getNutritionInsights,
  getSummary
};
