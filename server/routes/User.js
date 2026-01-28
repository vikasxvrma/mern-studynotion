// here we will write all the routes for user
const express = require("express");
const userRoute = express.Router();

//   import middlewares
const auth = require("../middlewares/auth");
// now import all the handler to be  mount on route
const {
  SendOtp,
  LogIn,
  verifyOtp,
  CreateUser,
  getUserDetails,
  ChangePassword,
} = require("../controllers/Auth");
const {
  ResetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

// Auth routes
userRoute.post("/sendotp", SendOtp);
userRoute.post("/verifyotp", verifyOtp);
userRoute.post("/signup", CreateUser);
userRoute.post("/login", LogIn);
userRoute.get("/getuserdetails", auth, getUserDetails);
userRoute.post("/changepassword", auth, ChangePassword);

// Reset password
userRoute.post("/reset-password-token", ResetPasswordToken);
userRoute.post("/reset-password", resetPassword);

module.exports = userRoute;
