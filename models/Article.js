// models/Article.js
const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  tags: [String],
  timestamp: { type: Date, default: Date.now },
} , { versionKey: false });

module.exports = mongoose.model('Article', ArticleSchema);
