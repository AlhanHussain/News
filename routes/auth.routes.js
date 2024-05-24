// routes/auth.js
const express = require('express')
const AuthRouter = express.Router()
const { register, login } = require('../controllers/authController')

AuthRouter.post('/register', register)

AuthRouter.post('/login', login)

module.exports = AuthRouter
