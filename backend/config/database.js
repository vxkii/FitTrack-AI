const mongoose = require('mongoose');
const dns = require('dns');

const connectDB = async () => {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '1.1.1.1']);

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000
    });

    console.log('MongoDB Atlas connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:');
    console.error(error);
    throw error;
  }
};

module.exports = connectDB;
