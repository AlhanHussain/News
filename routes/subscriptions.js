// routes/subscriptions.js
const express = require('express');
const router = express.Router();
const { subscribe, getSubscriptions } = require('../controllers/subscriptionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, subscribe);
router.get('/', authMiddleware, getSubscriptions);

module.exports = router;
