// here we will the route for payment 

const express =require("express");
const paymentRoute =express.Router();

// import middlewares 

const auth= require("../middlewares/auth");
const { isStudent, isInstructor, isAdmin } =require("../middlewares/whoisthere");

// import handler functions 
const { capturePayment, verifySignature, sendPaymentSuccessEmail }= require("../controllers/Razorpay");

// now mount the routes 
paymentRoute.post("/capturepayment",auth,isStudent,capturePayment);
paymentRoute.post("/verifypayment",auth,isStudent,verifySignature);



module.exports= paymentRoute;