const jwt = require('jsonwebtoken');

/**
 * Authentication Middleware to protect Express routes with JWT verification.
 */
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // 1. Check for Authorization header and 'Bearer ' format
    if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        status: 'rejected',
        message: 'Access denied. Authorization token required.'
      });
    }

    // 2. Extract token string
    const token = authHeader.split(' ')[1]?.trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        status: 'rejected',
        message: 'Access denied. Authorization token required.'
      });
    }

    // 3. Verify JWT token with secret from environment variables
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('CRITICAL: JWT_SECRET environment variable is missing.');
      return res.status(500).json({
        success: false,
        status: 'error',
        message: 'Something went wrong. Please try again later.'
      });
    }

    const decoded = jwt.verify(token, secret);

    // 4. Attach user ID to req.user securely
    req.user = {
      id: decoded.id || decoded.userId
    };

    next();

  } catch (error) {
    // 5. Catch token expiration or invalid signature error (no token or secret logged)
    return res.status(401).json({
      success: false,
      status: 'rejected',
      message: 'Invalid or expired token.'
    });
  }
};

module.exports = authMiddleware;
