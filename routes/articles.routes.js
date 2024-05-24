// routes/articles.js
const express = require('express')
const ArticleRouter = express.Router()
const articleController = require('../controllers/articleController')
const authMiddleware = require('../middleware/authMiddleware')

/**
 * url : /api/articles
 */

ArticleRouter.post('/', authMiddleware, articleController.createArticle)

ArticleRouter.get('/', articleController.getArticles)

ArticleRouter.get('/search', articleController.searchArticle)

// PUT route to update an existing article
ArticleRouter.put('/:id', authMiddleware, articleController.updateArticle)

// DELETE route to delete an existing article
ArticleRouter.delete('/:id', authMiddleware, articleController.deleteArticle)

module.exports = ArticleRouter
