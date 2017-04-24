const mongoose = require('mongoose');
const Podcast = require('../models/podcast');

const podcastSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true, unique: true },
  description: { type: String, trim: true }
}, {
  timestamps: true
});


module.exports = mongoose.model('Podcast', podcastSchema);
