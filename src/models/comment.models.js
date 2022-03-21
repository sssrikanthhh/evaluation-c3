const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  body: {
    type: Number,
    required: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user"
  },
  bookId: {
    type: mongoose.Types.ObjectId,
    ref: 'book'
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('book', bookSchema);