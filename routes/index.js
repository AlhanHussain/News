const express = require('express')
const AuthRouter = require('./auth.routes')
const ArticleRouter = require('./articles.routes')
const SubscriptionRouter = require('./subscriptions.routes')
const commentRouter = require('./comments.routes')

const router = express.Router()

router.get('/status', (req, res) => {
  res.json({
    message: 'server is live',
  })
})

router.use('/auth', AuthRouter)

router.use('/articles', ArticleRouter)

router.use('/subscriptions', SubscriptionRouter)

router.use('/comment', commentRouter)

module.exports = router
