const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/database');
const healthRoutes = require('./routes/healthRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', userRoutes);
// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to FitTrack AI Backend API Services'
  });
});

// Connect MongoDB Atlas and Start Server
connectDB()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`FitTrack AI Express Backend running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
   console.error('CRITICAL: Failed to connect to MongoDB Atlas:', err);
    process.exit(1);
  });