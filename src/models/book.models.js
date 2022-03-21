const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  likes: {
    type: Number,
    required: false,
    default: 0,
    min: 0
  },
  coverImage: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user"
  },
  publicationId: {
    type: mongoose.Types.ObjectId,
    ref: 'publication'
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('book', bookSchema);