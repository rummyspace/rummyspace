const mongoose = require("mongoose");
require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const nocache = require("nocache");
const path = require('path');
const adminRoute = require('./routes/adminRoute');
const userRoute = require('./routes/userRoute');

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(error => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

app.use(nocache());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/static',express.static(path.join(__dirname,'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.set('view engine', 'ejs');
app.set('views', './views');

 
app.use('/admin', adminRoute);
app.use('/', userRoute);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
