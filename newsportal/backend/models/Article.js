const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  source: String,
  publishedAt: Date,
});

module.exports = mongoose.model('Article', ArticleSchema);