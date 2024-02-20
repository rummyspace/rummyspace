const mongoose = require('mongoose');

const subscribersSchema = new mongoose.Schema({
    email: String,
    date: {
        type: Date,
        default: Date.now
    },
    
});

module.exports = mongoose.model('Subscriber', subscribersSchema);
