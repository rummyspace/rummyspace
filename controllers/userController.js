const express = require('express');
const router = express.Router();
require('dotenv').config();
const Product = require('../models/productsModel');
const Message = require('../models/messageModel');
const Feedback = require('../models/feedbackModel');
const Subscriber = require('../models/subscribersModel');



const home = async (req, res) => {
    try {
        const productsData = await Product.find({ isActive: true }).sort({ priorityNumber: 1 });
        // console.log(productsData[0])
        const messageData = await Message.find()
        const mostDownloaded = await Product.find().sort({ mostDownloads: -1 }).limit(3);


        res.render('./users/index', { messageData, productsData, mostDownloaded })
    } catch (error) {
        console.error("Error in userController-home", error.message);
        res.status(500).send('Error in userController-home');
    }
}

const loadAbout = async (req, res) => {
    try {
        res.render('./users/about')
    } catch (error) {
        console.error("Error in userController-about", error.message);
        res.status(500).send('Error in userController-about');
    }
}


const loadContact = async (req, res) => {
    try {
        res.render('./users/contact')
    } catch (error) {
        console.error("Error in userController-contact", error.message);
        res.status(500).send('Error in userController-contact');
    }
}

const privacy = async (req, res) => {
    try {
        res.render('./users/privacy')
    } catch (error) {
        console.error("Error in userController-privacy", error.message);
        res.status(500).send('Error in userController-privacy');
    }
}

const terms = async (req, res) => {
    try {
        res.render('./users/terms')
    } catch (error) {
        console.error("Error in userController-terms", error.message);
        res.status(500).send('Error in userController-terms');
    }
}

const loadServices = async (req, res) => {
    try {
        res.render('./users/services')
    } catch (error) {
        console.error("Error in userController-services", error.message);
        res.status(500).send('Error in userController-services');
    }
}
const inc = async (req, res) => {
    try {
        // res.render('./users/services
        // console.log(req.params.id)
        const product = await Product.findById(req.params.id)
        product.mostDownloads = product.mostDownloads + 1;
        const productData = await product.save();
        // console.log(productData)
    } catch (error) {
        console.error("Error in userController-inc", error.message);
        res.status(500).send('Error in userController-inc');
    }
}

const individualProductPage = async (req, res) => {
    try {

        const productId = req.query.productId
        // console.log(productId)
        const messageData = await Message.find()
        const productData = await Product.findById(productId)
        // console.log(productData)

        res.render('./users/individualProductPage', { productData, messageData })
    } catch (error) {
        console.error("Error in userController-individualProductPage", error.message);
        res.status(500).send('Error in userController-individualProductPage');
    }
}

const submitContact = async (req, res) => {
    try {
        // console.log(req.body)
        const feedback = new Feedback({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message
        })

        const feedbackMessage = await feedback.save();
        // console.log("feedbackMessage")
        console.log(feedbackMessage)

        res.redirect('/contact')
    } catch (error) {
        console.error("Error in userController-submit contact", error.message);
        res.status(500).send('Error in userController-submit contact');
    }
}


const subscribeMail = async (req, res) => {
    try {
        const data = new Subscriber({
            email: req.body.email,
        })
        const subscribersDataSaved = await data.save();
        console.log("subscribers saved: ", subscribersDataSaved)
        // res.redirect('/')
    } catch (error) {
        console.error("Error in subscribeMail: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error in subscribeMail" });
    }
};



module.exports = {
    home,
    loadContact,
    loadAbout,
    loadServices,
    inc,
    individualProductPage,
    submitContact,
    privacy,
    terms,
    subscribeMail
}

