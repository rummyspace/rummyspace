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

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
<%- include('../partials/header')-%>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
    <script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>

    <style>
        /* Define styles for images */
        .intro-image {
            width: 100px;
            height: 100px;
        }

        /* Media query for small screens */
        @media (max-width: 768px) {
            .intro-image {
                width: 100px;
                height: 100px;
            }
        }

        /* Media query for medium screens */
        @media (min-width: 768px) and (max-width: 992px) {
            .intro-image {
                width: 150px;
                height: 150px;
            }
        }

        /* Media query for large screens */
        @media (min-width: 992px) {
            .intro-image {
                width: 300px;
                height: 300px;
            }
        }

        .moving-text-container {
            overflow: hidden;
            white-space: nowrap;
        }

        .moving-text {
            animation: moveRightToLeft 10s linear infinite;
        }

        @keyframes moveRightToLeft {
            0% {
                transform: translateX(100%);
            }

            100% {
                transform: translateX(-100%);
            }
        }
    </style>

    <body>
        <div class="container-xxl bg-white p-0">
            <!-- Spinner Start -->
            <div id="spinner"
                class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
                <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <!-- Spinner End -->

            <!-- Navbar & Hero Start -->
            <div class="container-xxl position-relative p-0">
                <%- include('../partials/navbar')-%>


                    <div class="container-xxl py-5 bg-dark hero-header mb-5">
                        <div class="container my-5 py-5">
                            <div class="row align-items-center g-5">
                                <div class="col-lg-6 text-center text-lg-start">
                                    <h1 class="display-3 text-white animated slideInLeft">Welcome to<br>RummySpace.in
                                    </h1>
                                    <p class="text-white animated slideInLeft mb-4 pb-2">
                                        "Participation in these games is intended for adults aged 18 and above. Please
                                        use these responsibly. We cannot be held responsible for any financial
                                        outcomes."</p>

                                </div>

                            </div>
                        </div>
                    </div>
            </div>



            <!-- Intro -->
            <section id="intro" class="container">
                <div class="row">


                    <% if(productsData && productsData.length>1 ) {%>
                        <div class="col-4 col-12-medium mt-5 pt-5 d-flex flex-column justify-content-center">
                            <div class="d-flex justify-content-center">
                                <!-- <img src="/static/userAssets/img/leaderBoard/podium.png" max-width="5px" max-height="5px" alt="" class="intro-image"> -->
                                <img src="/static/userAssets/img/leaderBoard/2.png" alt="" class="intro-image"
                                    style="max-width: 100px; max-height: 100px;">
                            </div>
                            <div class="d-flex justify-content-center">
                                <section class="middle ">
                                    <a href="/individualProductPage?productId=<%= productsData[1]._id %>">
                                        <img src="/productImages/<%= productsData[1].imageUrl %>" alt=""
                                            class="intro-image">
                                    </a>
                                    <div class="d-flex flex-column justify-content-center align-items-center ">
                                        <h6>
                                            <a href="/individualProductPage?productId=<%= productsData[1]._id %>">
                                                <%= productsData[1].productName %>
                                            </a>
                                        </h6>
                                        <img src="/static/userAssets/img/leaderBoard/stars.webp" alt=""
                                            style="max-width: 80px; max-height: 50px;">
                                        <span class="text-success">100% Verified </span>

                                    <% if( productsData[1].redirectLink &&   productsData[1].redirectLink !== 'undefined' ){ %>
                                     <a href="<%=productsData[1].redirectLink%>">   <button id="downloadButton"
                                        
                                        class="btn btn-primary rounded-pill py-1 py-sm-2 px-2 px-sm-3 shadow-lg"
                                        style="background-image: linear-gradient(to right, #4e54c8, #8f94fb); border: none; font-size: 0.8rem;">
                                        <i class="fas fa-download mr-1"></i> Open
                                    </button></a>
                                    <% }else{  %>

                                        <button id="downloadButton"
                                            onclick="downloadAPK('<%= productsData[1].downloadLink %>','<%= productsData[1].productName %>','<%= productsData[1]._id %>', '<%=productsData[1].referral %>')"
                                            class="btn btn-primary rounded-pill py-1 py-sm-2 px-2 px-sm-3 shadow-lg"
                                            style="background-image: linear-gradient(to right, #4e54c8, #8f94fb); border: none; font-size: 0.8rem;">
                                            <i class="fas fa-download mr-1"></i> Download
                                        </button>
                                        <% } %>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <% } %>

                            <% if(productsData && productsData.length> 0 ) {%>

                                <div class="col-4 col-12-medium pt-0 d-flex flex-column justify-content-center">
                                    <div class="d-flex justify-content-center">
                                        <!-- <img src="/static/userAssets/img/leaderBoard/podium.png" max-width="5px" max-height="5px" alt="" class="intro-image"> -->
                                        <img src="/static/userAssets/img/leaderBoard/first.png" alt=""
                                            class="intro-image" style="max-width: 100px; max-height: 100px;">

                                    </div>
                                    <div class="d-flex justify-content-center">
                                        <section class="middle ">
                                            <a href="/individualProductPage?productId=<%= productsData[0]._id %>">

                                                <img src="/productImages/<%= productsData[0].imageUrl %>" alt=""
                                                    class="intro-image"> </a>
                                            <div class="d-flex flex-column justify-content-center align-items-center ">
                                                <h6>
                                                    <a
                                                        href="/individualProductPage?productId=<%= productsData[0]._id %>">

                                                        <%= productsData[0].productName %>
                                                    </a>

                                                </h6>
                                                <img src="/static/userAssets/img/leaderBoard/stars.webp" alt=""
                                                    style="max-width: 80px; max-height: 50px;">
                                                <span class="text-success">100% Verified </span>
                                                <% if( productsData[0].redirectLink &&   productsData[0].redirectLink !== 'undefined' ){ %>
                                                    <a href="<%=productsData[0].redirectLink%>">   <button id="downloadButton"
                                                       
                                                       class="btn btn-primary rounded-pill py-1 py-sm-2 px-2 px-sm-3 shadow-lg"
                                                       style="background-image: linear-gradient(to right, #c84e4e, #8f94fb); border: none; font-size: 0.8rem;">
                                                    Open Link
                                                   </button></a>
                                                   <% }else{  %>
                                                <button id="downloadButton"
                                                    onclick="downloadAPK('<%= productsData[0].downloadLink %>','<%= productsData[0].productName %>','<%= productsData[0]._id %>', '<%=productsData[0].referral %>')"
                                                    class="btn btn-primary rounded-pill py-1 py-sm-2 px-2 px-sm-3 shadow-lg"
                                                    style="background-image: linear-gradient(to right, #4e54c8, #8f94fb); border: none; font-size: 0.8rem;">
                                                    <i class="fas fa-download mr-1"></i> Download
                                                </button>
                                                <% }   %>
                                            </div>
                                        </section>
                                    </div>
                                </div>

                                <% } %>


                                    <% if(productsData && productsData.length> 2 ) {%>
                                        <div
                                            class="col-4 col-12-medium mt-5 pt-5  d-flex flex-column justify-content-center">
                                            <div class="d-flex justify-content-center">
                                                <!-- <img src="/static/userAssets/img/leaderBoard/podium.png" max-width="5px" max-height="5px" alt="" class="intro-image"> -->
                                                <img src="/static/userAssets/img/leaderBoard/3.png" alt=""
                                                    class="intro-image" style="max-width: 100px; max-height: 100px;">

                                            </div>
                                            <div class="d-flex justify-content-center">
                                                <section class="middle ">
                                                    <a
                                                        href="/individualProductPage?productId=<%= productsData[2]._id %>">

                                                        <img src="/productImages/<%= productsData[2].imageUrl %>" alt=""
                                                            class="intro-image"> </a>
                                                    <div
                                                        class="d-flex flex-column justify-content-center align-items-center ">
                                                        <h6>
                                                            <a
                                                                href="/individualProductPage?productId=<%= productsData[2]._id %>">

                                                                <%= productsData[2].productName %>
                                                            </a>
                                                        </h6>
                                                        <img src="/static/userAssets/img/leaderBoard/stars.webp" alt=""
                                                            style="max-width: 80px; max-height: 50px;">
                                                        <span class="text-success">100% Verified </span>
                                                        <% if( productsData[2].redirectLink &&   productsData[2].redirectLink !== 'undefined' ){ %>
                                                            <a href="<%=productsData[2].redirectLink%>">   <button id="downloadButton"
                                                               
                                                               class="btn btn-primary rounded-pill py-1 py-sm-2 px-2 px-sm-3 shadow-lg"
                                                               style="background-image: linear-gradient(to right, #c84e4e, #8f94fb); border: none; font-size: 0.8rem;">
                                                            Open Link
                                                           </button></a>
                                                           <% }else{  %>
                                                        <button id="downloadButton"
                                                            onclick="downloadAPK('<%= productsData[2].downloadLink %>','<%= productsData[2].productName %>','<%= productsData[2]._id %>', '<%=productsData[2].referral %>')"
                                                            class="btn btn-primary rounded-pill py-1 py-sm-2 px-2 px-sm-3 shadow-lg"
                                                            style="background-image: linear-gradient(to right, #4e54c8, #8f94fb); border: none; font-size: 0.8rem;">
                                                            <i class="fas fa-download mr-1"></i> Download
                                                        </button>
                                                        <% }  %>

                                                    </div>
                                                </section>
                                            </div>
                                        </div>

                                        <% } %>
                </div>
            </section>

            <% if (messageData.length> 0) { %>
                <div class="moving-text-container bg-dark text-white mt-5">
                    <div class="moving-text">
                        <% messageData.forEach(function(message) { %>
                            <%= message.text1 %> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                &nbsp; &nbsp;
                                <% }); %>
                    </div>
                </div>
                <% } %>



                    <!-- Menu Start -->
                    <div class="container-xxl py-5">
                        <div class="container">
                            <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
                                <h5 class="section-title ff-secondary text-center text-primary fw-normal">RummySpace.in
                                </h5>
                                <h1 class="mb-5">Our Apps</h1>
                            </div>
                            <div class="tab-class text-center wow fadeInUp" data-wow-delay="0.1s">
                                <ul class="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
                                    <li class="nav-item">
                                        <a class="d-flex align-items-center text-start mx-3 ms-0 pb-3 active"
                                            data-bs-toggle="pill" href="#tab-1">
                                            <i class="fas fa-arrow-up fa-2x text-primary"></i>
                                            <div class="ps-3">
                                                <small class="text-body">All</small>
                                                <h6 class="mt-n1 mb-0">Apps</h6>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="d-flex align-items-center text-start mx-3 pb-3" data-bs-toggle="pill"
                                            href="#tab-2">
                                            <i class="fa fa-chart-bar fa-2x text-primary"></i>
                                            <div class="ps-3">
                                                <small class="text-body">Popular</small>
                                                <h6 class="mt-n1 mb-0">Apps</h6>
                                            </div>
                                        </a>
                                    </li>

                                </ul>
                                <div class="tab-content">
                                    <div id="tab-1" class="tab-pane fade show p-0 active">
                                        <div class="row g-4">

                                            <% if(productsData) { %>
                                                <% productsData.slice(3).forEach((product)=> { %>
                                                    <div class="col-lg-6">
                                                        <div class="d-flex align-items-center">
                                                            <a
                                                                href="/individualProductPage?productId=<%= product._id %>">
                                                                <img class="flex-shrink-0 img-fluid rounded"
                                                                    src="/productImages/<%= product.imageUrl %>"
                                                                    alt="<%= product.productName %>"
                                                                    style="width: 80px;">
                                                            </a>

                                                            <div class="w-100 d-flex flex-column text-start ps-4">
                                                                <h5
                                                                    class="d-flex justify-content-between border-bottom pb-2">
                                                                    <span>
                                                                        <a
                                                                            href="/individualProductPage?productId=<%= product._id %>">
                                                                            <%= product.productName %>
                                                                        </a>
                                                                    </span>
                                                                    <% if( product.redirectLink &&   product.redirectLink !== 'undefined' ){ %>
                                                                        <a href="<%=product.redirectLink%>">   <button id="downloadButton"
                                                                           
                                                                           class="btn btn-primary rounded-pill py-1 py-sm-2 px-2 px-sm-3 shadow-lg"
                                                                           style="background-image: linear-gradient(to right, #c84e4e, #8f94fb); border: none; font-size: 0.8rem;">
                                                                        Open Link
                                                                       </button></a>
                                                                       <% }else{  %>
                                                                    <button id="downloadButton"
                                                                        onclick="downloadAPK('<%= product.downloadLink %>','<%= product.productName %>','<%= product._id %>', '<%=product.referral %>')"
                                                                        class="btn btn-primary rounded-pill py-1 py-sm-2 px-2 px-sm-3 shadow-lg"
                                                                        style="background-image: linear-gradient(to right, #4e54c8, #8f94fb); border: none; font-size: 0.8rem;">
                                                                        <i class="fas fa-download mr-1"></i> Download
                                                                    </button>
                                                                    <% }  %>
                                                                </h5>
                                                                <small class="fst-italic">
                                                                    <%= product.text1 %>
                                                                </small>
                                                                <small class="fst-italic">
                                                                    <%= product.text2 %>
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <% }) %>
                                                        <% } %>




                                        </div>
                                    </div>


                                    <div id="tab-2" class="tab-pane fade show p-0">
                                        <div class="row g-4">


                                            <% if(productsData) {%>
                                                <% productsData.forEach((product)=>{ %>

                                                    <% if(product.isPopular===true){ %>
                                                        <div class="col-lg-6">
                                                            <div class="d-flex align-items-center">
                                                                <a
                                                                    href="/individualProductPage?productId=<%= product._id %>">
                                                                    <img class="flex-shrink-0 img-fluid rounded"
                                                                        src="/productImages/<%= product.imageUrl %>"
                                                                        alt="" style="width: 80px;"> </a>
                                                                <div class="w-100 d-flex flex-column text-start ps-4">
                                                                    <h5
                                                                        class="d-flex justify-content-between border-bottom pb-2">
                                                                        <span>
                                                                            <a
                                                                                href="/individualProductPage?productId=<%= product._id %>">
                                                                                <%= product.productName %>
                                                                            </a>
                                                                        </span>
                                                                        <!-- <span class="text-primary">$115</span> -->
                                                                        <% if( product.redirectLink &&   product.redirectLink !== 'undefined' ){ %>
                                                                            <a href="<%=product.redirectLink%>">   <button id="downloadButton"
                                                                               
                                                                               class="btn btn-primary rounded-pill py-1 py-sm-2 px-2 px-sm-3 shadow-lg"
                                                                               style="background-image: linear-gradient(to right, #c84e4e, #8f94fb); border: none; font-size: 0.8rem;">
                                                                            Open Link
                                                                           </button></a>
                                                                           <% }else{  %>
                                                                        <button id="downloadButton"
                                                                            onclick="downloadAPK('<%= product.downloadLink %>','<%= product.productName %>','<%= product._id %>', '<%=product.referral %>')"
                                                                            class="btn btn-primary rounded-pill py-1 py-sm-2 px-2 px-sm-3 shadow-lg"
                                                                            style="background-image: linear-gradient(to right, #4e54c8, #8f94fb); border: none; font-size: 0.8rem;">
                                                                            <i class="fas fa-download mr-1"></i> Download
                                                                        </button>
                                                                        <% }  %>

                                                                    </h5>
                                                                    <small class="fst-italic">
                                                                        <%= product.text1 %>
                                                                    </small>
                                                                    <small class="fst-italic">
                                                                        <%= product.text2 %>
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <% }%>
                                                            <% }) %>
                                                                <% } %>





                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Menu End -->






                    <!-- Testimonial Start -->
                    <div class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="container">
                            <div class="text-center">
                                <h5 class="section-title ff-secondary text-center text-primary fw-normal">Top Downloads
                                </h5>
                                <h1 class="mb-5">Explore them!!!</h1>
                            </div>
                            <div class="owl-carousel testimonial-carousel">

                                <% if(mostDownloaded) {%>
                                    <% mostDownloaded.forEach((product)=>{ %>

                                        <div class="testimonial-item  border rounded p-4">
                                            <i class="fa fa-quote-left fa-2x text-primary mb-3"></i>
                                            <div class="d-flex align-items-center">

                                                <a href="/individualProductPage?productId=<%= product._id %>">
                                                    <img class="flex-shrink-0 img-fluid rounded"
                                                        src="/productImages/<%= product.imageUrl %>""
                                    alt="" style=" width: 80px;"> </a>
                                                <div class="w-100 d-flex flex-column text-start ps-4">
                                                    <h5 class="d-flex justify-content-between border-bottom pb-2">
                                                        <span>
                                                            <a
                                                                href="/individualProductPage?productId=<%= product._id %>">
                                                                <%= product.productName %>
                                                            </a>
                                                        </span>
                                                        <!-- <span class="text-primary">$115</span> -->
                                                        <% if( product.redirectLink &&   product.redirectLink !== 'undefined' ){ %>
                                                            <a href="<%=product.redirectLink%>">   <button id="downloadButton"
                                                               
                                                               class="btn btn-primary rounded-pill py-1 py-sm-2 px-2 px-sm-3 shadow-lg"
                                                               style="background-image: linear-gradient(to right, #c84e4e, #8f94fb); border: none; font-size: 0.8rem;">
                                                            Open Link
                                                           </button></a>
                                                           <% }else{  %>
                                                        <button id="downloadButton"
                                                            onclick="downloadAPK('<%= product.downloadLink %>','<%= product.productName %>','<%= product._id %>', '<%=product.referral %>')"
                                                            class="btn btn-primary rounded-pill py-1 py-sm-2 px-2 px-sm-3 shadow-lg"
                                                            style="background-image: linear-gradient(to right, #4e54c8, #8f94fb); border: none; font-size: 0.8rem;">
                                                            <i class="fas fa-download mr-1"></i> Download
                                                        </button>
                                                        <% }  %>
                                                    </h5>
                                                    <small class="fst-italic">
                                                        <%= product.text1 %>
                                                    </small>
                                                    <small class="fst-italic">
                                                        <%= product.text2 %>
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <% }) %>
                                            <% } %>




                            </div>
                        </div>
                    </div>
                    <!-- Testimonial End -->







                    <!-- message -->
                    <% if (messageData.length> 0) { %>
                        <div class="moving-text-container bg-dark text-white mt-5">
                            <div class="moving-text">
                                <% messageData.forEach(function(message) { %>
                                    <%= message.text1 %> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                        &nbsp; &nbsp; &nbsp;
                                        <% }); %>
                            </div>
                        </div>
                        <% } %>


                            <style>
                                .containerSub {
                                    background-image: url(/wallpaper\ \(3\).jpg);
                                    margin-top: 50px;
                                    background-size: cover;
                                    background-position: center;
                                    border-radius: 5px;
                                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                                    padding: 30px;
                                    text-align: center;
                                    animation: fadeIn 1s ease-in-out;
                                }

                                @keyframes fadeIn {
                                    0% {
                                        opacity: 0;
                                        transform: translateY(-20px);
                                    }

                                    100% {
                                        opacity: 1;
                                        transform: translateY(0);
                                    }
                                }

                                h1 {
                                    font-size: 24px;
                                    margin-bottom: 20px;
                                    color: white;
                                }

                                form {
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: center;
                                    align-items: center;
                                }

                                label {
                                    margin-bottom: 5px;
                                }

                                .input-container {
                                    display: flex;
                                    align-items: center;
                                }

                                input[type="email"] {
                                    padding: 10px;
                                    border: 1px solid #ccc;
                                    border-radius: 3px;
                                    margin-bottom: 10px;
                                    width: 250px;
                                }

                                button {
                                    padding: 10px 15px;
                                    margin-bottom: 10px;
                                    margin-left: 5px;
                                    background-color: #e74c3c;
                                    /* Initial color set to green */
                                    color: #fff;
                                    border: none;
                                    border-radius: 3px;
                                    cursor: pointer;
                                    transition: background-color 0.3s ease-in-out;
                                }

                                button:hover {
                                    background-color: #690f0f;
                                }

                                .message {
                                    color: rgb(255, 255, 255);
                                    font-weight: bold;
                                    margin-top: 10px;
                                }
                            </style>
                            </head>

                            <body>
                                <div class="containerSub container-xxl">
                                    <h1 class=" text-center wow fadeInUp">Stay informed! Subscribe to our newsletter
                                    </h1>
                                    <form id="subscribe-form" method="post" action="/">
                                        <!-- <label for="email">Email Address:</label> -->
                                        <div class="input-container text-center wow fadeInUp">
                                            <input type="email" id="email" name="email" placeholder="Enter your email"
                                                required>
                                            <button type="submit">Subscribe</button>
                                        </div>
                                        <div class="message"></div>
                                    </form>
                                </div>
                                <script>
                                    const form = document.getElementById('subscribe-form');
                                    const emailInput = document.getElementById('email');
                                    const message = document.querySelector('.message');
                                    const submitButton = document.querySelector('button[type="submit"]');

                                    form.addEventListener('submit', function (event) {
                                        // event.preventDefault();

                                        const email = emailInput.value;

                                        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                                            message.innerHTML = "Thank you for subscribing! You will now receive our newsletter &#x2714;";
                                            message.style.color = "#ffffff";
                                            submitButton.style.backgroundColor = "#e74c3c"; // Change to red
                                            submitButton.textContent = "Subscribed";

                                            setTimeout(() => {
                                                submitButton.textContent = "Subscribe";
                                            }, 2000)
                                            return
                                        }

                                        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                                            message.textContent = "Invalid email address. Please enter a valid email.";
                                            message.style.color = "#e74c3c";
                                            form.reset();
                                        }




                                    });

                                </script>

                                <script>
                                    function downloadAPK(apkName, productName, iddd, referral) {
                                        // Copy referral to clipboard
                                        if (referral && typeof referral !== 'undefined') {
        copyToClipboard(referral);
    }
                                        // Create a dummy anchor element
                                        var dummyAnchor = document.createElement('a');

                                        // Set the attributes for the anchor element
                                        dummyAnchor.setAttribute('href', `/apkFiles/${apkName}`); // Replace with the path to your APK file
                                        dummyAnchor.setAttribute('download', `${productName}.apk`); // Replace with the desired name for the downloaded file

                                        // Append the anchor element to the document body
                                        document.body.appendChild(dummyAnchor);

                                        // Click the anchor element to trigger the download
                                        dummyAnchor.click();

                                        // Remove the anchor element from the document body
                                        document.body.removeChild(dummyAnchor);

                                        // Increase download count
                                        increase(iddd);
                                    }

                                    function increase(id) {
                                        fetch(`increase/${id}`, {
                                            method: 'Post'
                                        })
                                            .then((response) => response.json())
                                            .then(data => {
                                                if (data.success) {
                                                    toastr.success(data.message);
                                                    updateCartAndWishlistQuantity();
                                                } else {
                                                    toastr.warning(data.message);
                                                }
                                            })
                                            .catch(error => {
                                                console.error('Fetch error:', error);
                                            });
                                    }

                                    function copyToClipboard(text) {
                                        // Create a temporary textarea element
                                        var textarea = document.createElement('textarea');

                                        // Set the value of the textarea to the referral text
                                        textarea.value = text;

                                        // Append the textarea to the document body
                                        document.body.appendChild(textarea);

                                        // Select the text in the textarea
                                        textarea.select();

                                        // Execute the copy command
                                        document.execCommand('copy');

                                        // Remove the textarea from the document body
                                        document.body.removeChild(textarea);

                                        showToast(`Copied to the clipboard.`, 'success');

                                    }

                                    function showToast(message, type) {
                                        Toastify({
                                            text: message,
                                            duration: 3000,
                                            close: true,
                                            gravity: 'top',
                                            position: 'right',
                                            backgroundColor: type === 'success' ? 'green' : 'red',
                                        }).showToast();
                                    }
                                </script>

                                <!-- <script>
                                    function downloadAPK(apkName, productName, iddd, referral) {
                                        // console.log(productName)
                                        // console.log('id', iddd)
                                        // Create a dummy anchor element
                                        var dummyAnchor = document.createElement('a');

                                        // Set the attributes for the anchor element
                                        dummyAnchor.setAttribute('href', `/apkFiles/${apkName}`); // Replace with the path to your APK file
                                        dummyAnchor.setAttribute('download', `${productName}.apk`); // Replace with the desired name for the downloaded file

                                        // Append the anchor element to the document body
                                        document.body.appendChild(dummyAnchor);

                                        // Click the anchor element to trigger the download
                                        dummyAnchor.click();

                                        // Remove the anchor element from the document body
                                        document.body.removeChild(dummyAnchor);
                                        // increaseDownload(id)
                                        increase(iddd)
                                    }

                                    function increase(id) {
                                        // console.log('worked')
                                        let iD = '123'
                                        fetch(`increase/${id}`, {
                                            method: 'Post'
                                        })
                                            .then((response) => response.json())
                                            .then(data => {
                                                if (data.success) {
                                                    toastr.success(data.message)
                                                    updateCartAndWishlistQuantity()

                                                } else {
                                                    toastr.warning(data.message)
                                                }
                                            })
                                            .catch(error => {
                                                console.error('Fetch error:', error);
                                            });
                                    }


                                </script> -->

                                <%- include('../partials/footer')-%>
