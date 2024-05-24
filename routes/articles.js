// routes/articles.js
const express = require('express');
const router = express.Router();
const { createArticle, getArticles,updateArticle, deleteArticle  } = require('../controllers/articleController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createArticle);
router.get('/', getArticles);

// PUT route to update an existing article
router.put('/:id', authMiddleware, updateArticle);

// DELETE route to delete an existing article
router.delete('/:id', authMiddleware, deleteArticle);


module.exports = router;
