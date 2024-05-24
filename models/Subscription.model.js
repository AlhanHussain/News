// models/Subscription.js
const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { type: String, enum: ['free', 'premium'], required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
} , { versionKey: false });

module.exports = mongoose.model('Subscription', SubscriptionSchema);
