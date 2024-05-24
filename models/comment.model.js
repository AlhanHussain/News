// models/Comment.js
const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article',
      required: true,
    },
    timestamp: { type: Date, default: Date.now },
  },
  { versionKey: false },
)

const CommentModel = mongoose.model('Comment', CommentSchema)
module.exports = CommentModel
