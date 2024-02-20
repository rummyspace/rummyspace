const express = require('express');
const router = express.Router();
const session = require('express-session');
const upload = require('../multerConfig');
const adminController = require('../controllers/adminController');
const auth = require('../middleware/adminAuth');

router.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

router.get('/', auth.isLogout, adminController.adminLoginLoad);
router.post('/', auth.isLogout, adminController.adminVerifyLogin);
router.get('/adminHome', auth.isLogin, adminController.adminHome);
router.get('/addProducts', auth.isLogin, adminController.loadAddProducts);
router.post('/addProducts', auth.isLogin,
  upload.fields([{ name: 'image', maxCount: 1 }, { name: 'file', maxCount: 1 }]),
  adminController.addProducts
);
router.get('/productsList', auth.isLogin, adminController.productsList);
router.get('/deleteProduct', auth.isLogin, adminController.deleteProduct);
router.get('/editProducts', auth.isLogin, adminController.editProducts);
router.post('/editProducts', auth.isLogin, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'file', maxCount: 1 }]), adminController.editProductsUpdated);

router.get('/addMessage', auth.isLogin, adminController.loadAddMessage);
router.post('/addMessage', auth.isLogin, adminController.addMessage);
router.get('/deleteMessage', auth.isLogin, adminController.deleteMessage);
router.post('/increaseDownload/id', adminController.increaseDownload);
router.get('/feedbackPage', auth.isLogin, adminController.loadFeedbacks)
router.get('/subscribersPage', auth.isLogin, adminController.loadSubscribersPage)
router.get('/deleteSubscriber', auth.isLogin, adminController.deleteSubscriber)
 
router.get('/logout', auth.isLogin, adminController.adminLogout);

module.exports = router;
