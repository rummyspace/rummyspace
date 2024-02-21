const cron = require('node-cron');
const Product = require('../models/productsModel');
const Message = require('../models/messageModel');
const Feedback = require('../models/feedbackModel');
const Subscribers = require('../models/subscribersModel');
const nodemailer = require("nodemailer");
const path = require('path');
const { log } = require('console');

const adminLoginLoad = async (req, res) => {
    try {
        res.render('./admin/adminLoginPage', { message: '' });
    } catch (error) {
        console.error("Error in adminController-adminLoginLoad: ", error.message);
        res.status(500).send("Error in adminController-adminLoginLoad: " + error.message);
    }
}

const adminVerifyLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const permanentUsername = "rummyspaceadminpage";
        const permanentPassword = "lenovorummyspace";

        if (username === permanentUsername && password === permanentPassword) {
            req.session.admin = permanentUsername;
            res.render('./admin/adminHome');
        } else {
            res.render('./admin/adminLoginPage', { message: "Incorrect credentials!" });
        }
    } catch (error) {
        console.error("Error in adminController-adminVerifyLogin: ", error.message);
        res.status(500).send("Error in adminController-adminVerifyLogin: " + error.message);
    }
}

const adminLogout = async (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/admin/');
    } catch (error) {
        console.error("Error in adminController-adminLogout: ", error.message);
        res.status(500).send("Error in adminController-adminLogout: " + error.message);
    }
}

const adminHome = async (req, res) => {
    try {
        res.render('./admin/adminHome');
    } catch (error) {
        console.error("Error in adminController-adminHome: ", error.message);
        res.status(500).send("Error in adminController-adminHome: " + error.message);
    }
}

const loadAddProducts = async (req, res) => {
    try {
        res.render('./admin/addProducts');
    } catch (error) {
        console.error("Error in adminController-loadAddProducts: ", error.message);
        res.status(500).send("Error in adminController-loadAddProducts: " + error.message);
    }
}

const addProducts = async (req, res) => {
    try {
        const { productName, text1, text2,   description1,
            description2,
            description3, priorityNumber, expiryDate, isActive, isPopular, Broadcast } = req.body;
        const isActiveValue = isActive === 'No' ? false : true;
        const isPopularValue = isPopular === 'No' ? false : true;
        const BroadcastValue = Broadcast === 'No' ? false : true;
        const product = new Product({
            isActive: isActiveValue,
            isPopular: isPopularValue,
            Broadcast: BroadcastValue,
            productName,
            text1,
            text2,
            description1,
            description2,
            description3,
            priorityNumber,
            expiryDate,
            imageUrl: req.files['image'][0].filename,
            downloadLink: req.files['file'][0].filename
        });
        let newProductAdded = await product.save();

        if (newProductAdded && newProductAdded.Broadcast === true) {
          
            broadcastProduct1(newProductAdded)
        }
        res.redirect('/admin/productsList');
    } catch (error) {
        console.error("Error in adminController-addProducts: ", error.message);
        res.status(500).send("Error in adminController-addProducts: " + error.message);
    }
}

const productsList = async (req, res) => {
    try {
        let productsData = await Product.find().sort({ priorityNumber: 1 });
        res.render('./admin/productsList', { productsData });
    } catch (error) {
        console.error("Error in adminController-productsList: ", error.message);
        res.status(500).send("Error in adminController-productsList: " + error.message);
    }
}


const deleteProduct = async (req, res) => {
    try {
        const deleteProductId = req.query._id;
        await Product.findOneAndDelete({ _id: deleteProductId });
        res.redirect('/admin/productsList');
    } catch (error) {
        console.error("Error in adminController-deleteProduct: ", error.message);
        res.status(500).send("Error in adminController-deleteProduct: " + error.message);
    }
}

const editProducts = async (req, res) => {
    try {
        const editProductId = req.query._id;
        // console.log(editProductId);
        const editProductData = await Product.findById(editProductId);
        res.render('./admin/editProducts', { editProductData });
    } catch (error) {
        console.error("Error in adminController-editProducts: ", error.message);
        res.status(500).send("Error in adminController-editProducts: " + error.message);
    }
};


const editProductsUpdated = async (req, res) => {
    try {

        const { productId, productName, text1, text2, description1, description2, description3, priorityNumber, expiryDate, isActive, isPopular, Broadcast , mostDownloads} = req.body;
        // console.log("Broadcast:", Broadcast);
        const isActiveValue = isActive === 'No' ? false : true;
        const isPopularValue = isPopular === 'No' ? false : true;
        const BroadcastValue = Broadcast === 'No' ? false : true;
        // console.log("BroadcastValue : ", BroadcastValue);
        const updatedFields = {
            productName,
            text1,
            text2,
            description1,
            description2,
            description3,
            priorityNumber,
            expiryDate,
            mostDownloads,
            isActive: isActiveValue,
            isPopular: isPopularValue,
            Broadcast: BroadcastValue,
        };

        if (req.files['file'] && req.files['file'][0].filename) {
            updatedFields.downloadLink = req.files['file'][0].filename;
        }

        if (req.files['image'] && req.files['image'][0].filename) {
            updatedFields.imageUrl = req.files['image'][0].filename;
        }

        const updated = await Product.findByIdAndUpdate(productId, updatedFields);
        // console.log(updated);

        if (updated && updated.Broadcast === true) {
     
            broadcastProduct1(updated)

            // console.log("called fun updated")
        }
        res.redirect('/admin/productsList');
    } catch (error) {
        console.error("Error in adminController-editProductsUpdated: ", error.message);
        res.status(500).send("Error in adminController-editProductsUpdated: " + error.message);
    }
}

const loadAddMessage = async (req, res) => {
    try {
        const messageData = await Message.find()
        res.render('./admin/addMessage', { messageData })
    } catch (error) {
        console.error("Error in adminController-loadAddMessage: ", error.message);
        res.status(500).send("Error in adminController-loadAddMessage: " + error.message);
    }
}

const addMessage = async (req, res) => {
    try {
        const message = new Message({
            text1: req.body.message
        })
        const saveMessage = await message.save()
        res.redirect('/admin/addMessage')
    } catch (error) {
        console.error("Error in adminController-addMessage: ", error.message);
        res.status(500).send("Error in adminController-addMessage: " + error.message);
    }
}
const deleteMessage = async (req, res) => {
    try {
        const id = req.query._id;
        const deletedMessage = await Message.findOneAndDelete({ _id: id });
        res.redirect('/admin/addMessage');
    } catch (error) {
        console.error("Error in adminController-deleteMessage: ", error.message);
        res.status(500).send("Error in adminController-deleteMessage: " + error.message);
    }
};

const deleteSubscriber = async (req, res) => {
    try {
        const id = req.query._id;
        const deleteSubscriber = await Subscribers.findOneAndDelete({ _id: id });
        res.redirect('/admin/subscribersPage');
    } catch (error) {
        console.error("Error in adminController-deleteSubscriber: ", error.message);
        res.status(500).send("Error in adminController-deleteSubscriber: " + error.message);
    }
};


const increaseDownload = async (req, res) => {
    try {
        const productId = req.params.id;
        // console.log(productId)
        // console.log(req.body)
        // Check if productId is undefined or null
        if (!productId) {
            return res.status(400).json({ success: false, message: 'Product ID is missing in the request' });
        }

        // Find the product by id
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Increment mostDownloads field by 1
        product.mostDownloads += 1;

        // Save the updated product
        await product.save();

        res.status(200).json({ success: true, message: 'Download count increased successfully' });
    } catch (error) {
        console.error("Error in increaseDownload: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const loadFeedbacks = async (req, res) => {
    try {
        const feedbackData = await Feedback.find()
        res.render('./admin/feedbackPage', { feedbackData })
    } catch (error) {
        console.error("Error in loadFeedbacks: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const loadSubscribersPage = async (req, res) => {
    try {
        const subscribersData = await Subscribers.find()
        res.render('./admin/subscribersPage', { subscribersData })
    } catch (error) {
        console.error("Error in loadSubscribersPage: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


const updateProductStatus = async () => {
    try {
        const currentDate = new Date();
        const updated = await Product.updateMany({ expiryDate: { $lte: currentDate } }, { $set: { isActive: false } });
        // console.log('Product status updated successfully.');

    } catch (error) {
        console.error('Error updating product status:', error.message);
    }
};
 

const broadcastProduct1 = async (productData) => {
    try {
        // console.log("broadcast worked");
        // console.log(productData);

        if (productData && productData.Broadcast === true) {
            const subscribers = await Subscribers.find({}, 'email');
            for (let subscriber of subscribers) {
                mailTransporter(subscriber.email, productData._id, productData.productName, productData.text1, productData.text2, productData.description1,productData.description2,productData.description3, productData.imageUrl);
            }
        }
    } catch (error) {
        console.error("Error in broadcastProduct: ", error.message);
        // You may handle errors here according to your application's logic
    }
};


const mailTransporter = (email, id, productName, text1, text2, productDescription1, productDescription2, productDescription3)  => {
    // Create a transporter for Gmail
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
        }
    });

 
        const logoPath = path.join(__dirname,'final.png');
      

    // HTML content of the email
    let mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: "NEW PRODUCT ADDED",
        html: `

        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Application Launch</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            text-align: center;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
        .logo {
            width: 100px;
            height: auto;
            display: block;
            margin: 0 auto;
        }
        .content {
            margin-top: 20px;
            text-align: left;
            padding: 0 20px;
        }
        .footer {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            text-align: center;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }
        .unsubscribe-link {
            color: #fff;
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="cid:logo" alt="Company Logo" class="logo">
        </div>
        <div class="content">
            <h2 style="color: #4CAF50;">Exciting News! New Application Launched</h2>
            <p>We are thrilled to announce the launch of our latest application "${productName}" on RummySpaace.in.</p>
            <p>Our new application,  "${productName}", is something which you should see at the earliest. Whether you're a seasoned user or new to our platform, we believe "${productName}"  will become your favourite soon.</p>
            <h4>Here's a glimpse of what you can expect from "${productName}":</h4>
            <div class="product-info">
            <h1 style="color: #FF0000;">${productName}</h1>
            <h2 style="color: #4CAF50;">${text1}</h2>
            <h3 style="color: #4CAF50;">${text2}</h3>
            <p class="product-description">${productDescription1}</p>
            <p class="product-description">${productDescription2}</p>
            <p class="product-description">${productDescription3}</p>
          
        </div>
            <p>To experience the power of ${productName} firsthand, simply click on the link below:</p>
            <p><a href="https://rummyspace.in/individualProductPage?productId=${id}" style="color: #4CAF50; text-decoration: none; font-weight: bold;">Explore ${productName} Now!</a></p>
            <p>Thank you for your continued support and loyalty. We're confident that <a href="https://rummyspace.in/" style="color: #4CAF50; text-decoration: none; font-weight: bold;">RummySpace.in</a> will exceed your expectations and become an indispensable tool in your life.</p>
            <p>Best regards,<br>RummySpace.in<br> </p>
        </div>
        <div class="footer">
        <p class="message-content">If you want to unsubscribe from the broadcast service, just <a href="https://rummyspace.in/contact" class="unsubscribe-link">click here</a> to visit our site and type in your query in the contact form.</p>
        </div>
    </div>
</body>
</html>

 
        `,
        attachments: [
            {
                filename: 'final.png',
                path: logoPath ,
                cid: 'logo' // Use this to link the image in the HTML content
            },
             
        ]
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error in sending mail", error);
        } else {
            console.log(`Message sent to ${email} for verification`);
        }
    });
};

// Schedule the cron job to run every second
cron.schedule('* * * * * *', updateProductStatus,);



module.exports = {
    adminLoginLoad,
    adminVerifyLogin,
    adminLogout,
    adminHome,
    loadAddProducts,
    addProducts,
    productsList,
    deleteProduct,
    editProducts,
    editProductsUpdated,
    loadAddMessage,
    addMessage,
    increaseDownload,
    loadFeedbacks,
    deleteMessage,
    loadSubscribersPage,
    deleteSubscriber

}
