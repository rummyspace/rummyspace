const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dest = file.fieldname === 'image' ? 'public/productImages' : 'public/apkFiles';
    cb(null, path.join(__dirname, dest));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const productName = req.body.productName.replace(/\s+/g, '-').toLowerCase();
    const fileName = `${productName}-${Date.now()}${ext}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage });

module.exports = upload;
