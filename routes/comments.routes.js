const express = require('express')
const commentController = require('../controllers/comment.controller')
const commentRouter = express.Router()

commentRouter.post('/', commentController.addComment)

// Get comments for an article
commentRouter.get(
  '/articles/:articleId/comments',
  commentController.getCommentsByArticle,
)

// Delete a comment
commentRouter.delete('/comments/:commentId', commentController.deleteComment)

module.exports = commentRouter
