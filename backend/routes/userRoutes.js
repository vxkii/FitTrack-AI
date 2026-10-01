const express = require('express');
const router = express.Router();

/**
 * FitTrack AI Authentication Migration Notice:
 * Authentication and User Profile data storage have been fully migrated to Firebase Authentication and Cloud Firestore.
 * MongoDB is no longer used for user registration, credentials, JWTs, or user profiles.
 */

router.post('/register', (req, res) => {
  return res.status(410).json({
    success: false,
    status: 'deprecated',
    message: 'MongoDB authentication is deprecated. Please use Firebase Authentication.'
  });
});

router.post('/login', (req, res) => {
  return res.status(410).json({
    success: false,
    status: 'deprecated',
    message: 'MongoDB authentication is deprecated. Please use Firebase Authentication.'
  });
});

router.get('/me', (req, res) => {
  return res.status(410).json({
    success: false,
    status: 'deprecated',
    message: 'MongoDB authentication is deprecated. Please use Firebase Authentication.'
  });
});

module.exports = router;