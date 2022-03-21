const mongoose = require('mongoose');

const connectDB = async (req, res) => {
  try {
    await mongoose.connect('mongodb://localhost:27017/temp');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;