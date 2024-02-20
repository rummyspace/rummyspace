const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({

    text1: {
        type:String
    }

});

module.exports = mongoose.model('Message', messageSchema);
