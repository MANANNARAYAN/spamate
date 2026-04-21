const mongoose = require('mongoose');

const BillingSchema = new mongoose.Schema({
    customerId: String,
    amount: Number,
    paymentMethod: String,
    date: String
});

module.exports = mongoose.model('Billing', BillingSchema);