const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  body: { type: String, trim: true, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  podcast: { type: mongoose.Schema.ObjectId, ref: '', required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Podcast', commentSchema);
