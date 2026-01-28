// here we will write business logic as what to do when user
// hit certain routes like signup  or login or reset password

// so our Auth controller is build to handle for signup and login and reset password

const bcrypt = require("bcrypt");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Otp = require("../models/Otp");
const jwt = require("jsonwebtoken");
const otpgenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const passwordChangedEmailTemplate = require("../mail/templates/passwordChangedEmailTemplate");
require("dotenv").config();

// ========================= send otp  =========================

const SendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // check if user already exists
    const isPresent = await User.findOne({ email });
    if (isPresent) {
      return res.json({
        success: false,
        message: "user already present",
      });
    }

    // generate otp
    const otpvalue = otpgenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    // delete all unused otps for this user
    await Otp.deleteMany({ email });

    await Otp.create({
      email,
      otpvalue: otpvalue.toString(),
    });

    return res.status(200).json({
      success: true,
      message: " Email successfully sent for otp verification",
    });
  } catch (err) {
    console.log("there was error for otp verification");
    return res.status(500).json({
      success: false,
      message: "error found : " + err.message,
    });
  }
};

// ========================= VERIFY OTP =========================

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!otp || !email) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    // Get latest OTP entry
    const otpRecord = await Otp.findOne({ email }).sort({ createdAt: -1 });

    // If no OTP found
    if (!otpRecord) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // Compare OTP
    if (otpRecord.otpvalue !== otp) {
      return res.status(401).json({
        success: false,
        message: "Incorrect OTP",
      });
    }

    // OTP is correct → delete all OTPs for this user
    await Otp.deleteMany({ email });

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (err) {
    console.log("OTP verification error: ", err.message);
    return res.status(500).json({
      success: false,
      message: "Error verifying OTP: " + err.message,
    });
  }
};

// ========================= CREATE USER =========================

const CreateUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      accountType,
      password,
      confirmpassword,
    } = req.body;

    // validate fetched data
    if (
      !firstName ||
      !lastName ||
      !email ||
      !accountType ||
      !password ||
      !confirmpassword
    ) {
      return res.status(403).json({
        success: false,
        message: "Fill all fields!",
      });
    }

    if (password !== confirmpassword) {
      return res.status(403).json({
        success: false,
        message: "Your confirm password did not match!",
      });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      gender: null,
      about: null,
      phonenumber: null,
      dob: null,
      image: `https://ui-avatars.com/api/?name=${
        firstName + " " + lastName
      }&background=random&size=128`,
    });

    const newUser = await User.create({
      firstName,
      lastName,
      accountType,
      email,
      password: hashedPassword,
      additionalDetails: profileDetails._id,
    });

    return res.status(200).json({
      success: true,
      newUser,
      message: "User signed up successfully",
    });
  } catch (err) {
    console.log("user was not signed up");
    return res.status(500).json({
      success: false,
      message: "An error occured in creating user: " + err.message,
    });
  }
};

// ========================= LOGIN =========================

const LogIn = async (req, res) => {
  try {
    const { email, password, accountType } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "please fill all the credentials",
      });
    }

    const user = await User.findOne({ email })
      .populate("additionalDetails")
      .exec();

    if (!user) {
      return res.status(400).json({
        message: "please sign up first",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(403).json({
        message: "invalid credentials check your password",
      });
    }

    const payload = {
      email: user.email,
      accountType: user.accountType,
      id: user._id,
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "10hr",
    });

    // the option we are creating below is for cookie
    const option = {
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      accountType: user.accountType,
    };

    return res.cookie("token", token, option).status(200).json({
      success: true,
      token: token,
      user: userData,
      message: "User logged in successfully",
    });
  } catch (err) {
    console.log("there was an error in logging in");
    return res.status(500).json({
      success: false,
      message: "error occured in logging in : " + err.message,
    });
  }
};
// ========================CHANGE PASSWORD ========================
const ChangePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        password: hashedPassword,
      },
      { new: true }
    );

    await mailSender(
    updatedUser.email,
      "✅ Password Changed Successfully – StudyNotion",
      passwordChangedEmailTemplate({
        userName: updatedUser.firstName,
        supportEmail: "vikasworksspace@gmail.com",
      })
    );

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating password",
    });
  }
};

// ========================= GET  USER DETAILS  =========================

const getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    // validate user
    const userDetails = await User.findById(userId)
      .populate("additionalDetails")
      .populate("courses")
      .exec();
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User not present or invalid user id ",
      });
    }

    return res.status(200).json({
      success: true,
      userData: userDetails,
      message: "User fetched successfully ",
    });

    // if present just return the response
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occured in fetching  user: " + err.message,
    });
  }
};

// ========================= EXPORTS =========================

module.exports = {
  SendOtp,
  verifyOtp,
  CreateUser,
  LogIn,
  ChangePassword,
  getUserDetails,
};
