    const mongoose = require('mongoose');

    const productSchema = new mongoose.Schema({
        productName: String,
        text1: String,
        text2: String,
        description1: String,
        description2: String,
        description3: String,
        downloadLink: String,
        priorityNumber: {
            type: Number,
            // unique:true
        },
        imageUrl: String,  
        isActive:{
            type: Boolean,
            default : true
        },
        date: {
            type: Date,
            default: Date.now
        },
        expiryDate:{
            type: Date,
        },
        mostDownloads: {
            type: Number,
            default: 0
        },
        isPopular:{
            type: Boolean,
            default : false
        },
        Broadcast:{
            type: Boolean,
            default : false
        },
    });

    module.exports = mongoose.model('Product', productSchema);
