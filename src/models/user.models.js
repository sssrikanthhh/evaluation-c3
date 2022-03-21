const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  lastName: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 30
  },
  age: {
    type: Number,
    required: true,
    min: 1,
    max: 150
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  profileImages: { type: String, required: true }
}, {
  versionKey: false,
  timestamps: true
});

userSchema.methods.checkDetails = function (email, password) {
  if (email === this.email && password === this.password) {
    return true;
  }
};

module.exports = mongoose.model('user', userSchema);