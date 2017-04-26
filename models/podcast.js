const mongoose = require('mongoose');

const podcastSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String },
  feedUrl: { type: String },
  image: { type: String },
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Podcast', podcastSchema);
