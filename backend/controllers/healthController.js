const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'FitTrack AI API is running'
  });
};

module.exports = {
  getHealth
};
