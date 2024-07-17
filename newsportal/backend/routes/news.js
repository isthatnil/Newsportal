const express = require('express');
const router = express.Router();
const axios = require('axios');
const Article = require('../models/Article');

// Fetch and store news articles
router.get('/fetch', async (req, res) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`);
    const articles = response.data.articles;

    // Save articles to the database
    articles.forEach(async (article) => {
      const newArticle = new Article({
        title: article.title,
        description: article.description,
        url: article.url,
        source: article.source.name,
        publishedAt: article.publishedAt,
      });
      await newArticle.save();
    });

    res.status(200).json({ message: 'Articles fetched and stored successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get articles from the database
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;