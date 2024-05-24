// controllers/commentController.js

const Article = require('../models/Article.model')
const CommentModel = require('../models/comment.model')

exports.addComment = async (req, res, next) => {
  try {
    const { content, author, articleId } = req.body

    const comment = new CommentModel({
      content,
      author,
      article: articleId,
    })

    const savedComment = await comment.save()

    await Article.findByIdAndUpdate(articleId, {
      $push: { comments: savedComment._id },
    })

    res.status(201).json(savedComment)
  } catch (error) {
    next(error)
  }
}

exports.getCommentsByArticle = async (req, res) => {
  try {
    const { articleId } = req.params
    const comments = await Comment.find({ article: articleId }).populate(
      'author',
    )
    res.json(comments)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params
    const comment = await Comment.findByIdAndDelete(commentId)

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' })
    }

    await Article.findByIdAndUpdate(comment.article, {
      $pull: { comments: commentId },
    })

    res.json({ message: 'Comment deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
