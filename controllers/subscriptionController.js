// controllers/subscriptionController.js
const Subscription = require('../models/Subscription.model')

exports.subscribe = async (req, res, next) => {
  const { plan, endDate } = req.body
  try {
    const subscription = new Subscription({
      user: req.user.id,
      plan,
      endDate,
    })
    await subscription.save()
    res.json(subscription)
  } catch (err) {
    next(err)
  }
}

exports.getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user.id })
    res.json(subscriptions)
  } catch (err) {
    next(err)
  }
}
