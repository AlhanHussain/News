// controllers/subscriptionController.js
const Subscription = require('../models/Subscription');

exports.subscribe = async (req, res) => {
  const { plan, endDate } = req.body;
  try {
    const subscription = new Subscription({
      user: req.user.id,
      plan,
      endDate,
    });
    await subscription.save();
    res.json(subscription);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user.id });
    res.json(subscriptions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
