const mongoose = require('mongoose');

const podcastSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String }
});

module.exports = mongoose.model('Podcast', podcastSchema);
