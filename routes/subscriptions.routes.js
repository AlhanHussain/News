// routes/subscriptions.js
const express = require('express')
const SubscriptionRouter = express.Router()
const {
  subscribe,
  getSubscriptions,
} = require('../controllers/subscriptionController')
const authMiddleware = require('../middleware/authMiddleware')

SubscriptionRouter.post('/', authMiddleware, subscribe)
SubscriptionRouter.get('/', authMiddleware, getSubscriptions)

module.exports = SubscriptionRouter
