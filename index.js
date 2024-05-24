// server.js
const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 5000

const app = express()

// Connect Database
connectDB()

// Middleware
app.use(express.json())

app.use(cors())

app.use('/api', require('./routes/index'))

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Home Route' })
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
