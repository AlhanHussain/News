// controllers/articleController.js
const Article = require('../models/Article.model')
const nodemailer = require('nodemailer')
require('dotenv').config()

exports.createArticle = async (req, res) => {
  const { title, content, category, tags } = req.body
  try {
    const article = new Article({
      title,
      content,
      author: req.user.id,
      category,
      tags,
    })
    await article.save()

    // Send email notification
    sendEmailNotification(
      'New article created',
      `A new article "${title}" has been created.`,
    )

    res.json(article)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate('author', 'username')
    res.json(articles)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Update an article
exports.updateArticle = async (req, res) => {
  const { title, content, category, tags } = req.body
  const articleId = req.params.id
  try {
    let article = await Article.findById(articleId)
    if (!article) {
      return res.status(404).json({ msg: 'Article not found' })
    }

    // Check if the logged-in user is the author of the article
    if (article.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' })
    }

    // Update article fields
    article.title = title
    article.content = content
    article.category = category
    article.tags = tags

    await article.save()

    // Send email notification
    sendEmailNotification(
      'Article updated',
      `The article "${title}" has been updated.`,
    )

    res.json(article)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Function to send email notification
function sendEmailNotification(subject, body) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Specify your SMTP host
    port: 587, // Default SMTP port
    secure: false, // false for other ports
    auth: {
      user: process.env.GMAIL_USER, // Your email address
      pass: process.env.GMAIL_PASS, // Your email password
    },
  })

  let mailOptions = {
    from: process.env.GMAIL_USER,
    to: 'alhanhussain75@gmail.com', // Recipient email address
    subject: subject,
    text: body,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

// Delete an article
exports.deleteArticle = async (req, res) => {
  const articleId = req.params.id
  try {
    let article = await Article.findById(articleId)
    if (!article) {
      return res.status(404).json({ msg: 'Article not found' })
    }

    // Check if the logged-in user is the author of the article
    if (article.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' })
    }

    await Article.findByIdAndDelete(articleId)
    res.json({ msg: 'Article removed' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

//search an article
exports.searchArticle = async (req, res, next) => {
  try {
    const { category, tags, title, content, author } = req.query
    const query = {}

    if (category) {
      query.category = category
    }
    if (tags) {
      query.tags = { $in: tags.split(',') }
    }
    if (title) {
      query.title = { $regex: title, $options: 'i' }
    }
    if (content) {
      query.content = { $regex: content, $options: 'i' }
    }
    if (author) {
      query.author = author
    }

    const articles = await Article.find(query).populate('author')
    res.status(200).json({ data: articles })
  } catch (error) {
    next(error)
  }
}
