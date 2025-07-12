const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  type: String,
  size: String,
  condition: String,
  tags: [String],
  image: String, // <- store image file path as string
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Item', itemSchema);
