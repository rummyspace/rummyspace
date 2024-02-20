const express = require('express');
const router = express.Router();
const session = require('express-session');

const userController = require('../controllers/userController');


// Session handling
router.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true
    })
  );
   

// Home
router.get('/', userController.home);
router.post('/', userController.subscribeMail);
router.get('/contact', userController.loadContact);
router.post('/contact', userController.submitContact);
router.get('/about', userController.loadAbout);
router.get('/terms', userController.terms);
router.get('/privacy', userController.privacy);
router.get('/services', userController.loadServices);
router.post('/increase/:id', userController.inc);

router.get('/individualProductPage' , userController.individualProductPage)

   
module.exports = router;
