// ===================== IMPORTS =====================
const User = require("../models/User");
const Course = require("../models/Course");
const mailSender = require("../utils/mailSender");
const mongoose = require("mongoose");
const crypto = require("crypto");
const { instance } = require("../config/razorpay");
const enrollmentEmailTemplate = require("../mail/templates/enrollmentEmailTemplate");
const paymentSuccessEmailTemplate = require("../mail/templates/paymentSuccessEmailTemplate");

// ===================================================================
// ========================= CREATE ORDER =============================
// ===================================================================

const capturePayment = async (req, res) => {
  try {
    // frontend sends array of courseIds
    const { courses } = req.body;
    const userId = req.user.id;
    console.log("=== CAPTURE PAYMENT START ===");
    console.log("REQ.BODY:", req.body);
    console.log("REQ.USER:", req.user);

    // ---------- VALIDATION ----------
    if (!Array.isArray(courses) || courses.length === 0 || !userId) {
      return res.status(400).json({
        success: false,
        message: "Courses array and userId are required",
      });
    }

    // ---------- FETCH USER ----------
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let totalAmount = 0;
    const uid = new mongoose.Types.ObjectId(userId);

    // ---------- COURSE VALIDATION & PRICE CALC ----------
    for (const courseId of courses) {
      const course = await Course.findById(courseId);
      console.log("COURSE ID:", courseId);
      console.log("COURSE FOUND:", !!course);
      console.log("STUDENTS ENROLLED FIELD:", course.studentsenrolled);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "One or more courses not found",
        });
      }

      // prevent duplicate purchase
      if (course.studentsenrolled?.some((id) => id.equals(uid))) {
        return res.status(400).json({
          success: false,
          message: "User already enrolled in one of the courses",
        });
      }

      totalAmount += course.price;
    }

    // ---------- CREATE RAZORPAY ORDER ----------
    const options = {
      amount: totalAmount * 100, // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        courses,
        userId,
      },
    };
    console.log("TOTAL AMOUNT:", totalAmount);
    console.log("RAZORPAY INSTANCE:", instance);

    let paymentResponse;
    try {
      paymentResponse = await instance.orders.create(options);
    } catch (err) {
      console.error("RAZORPAY ERROR:", err);
      throw err;
    }

    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      orderId: paymentResponse.id,
      amount: paymentResponse.amount,
      currency: paymentResponse.currency,
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating order: " + error.message,
    });
  }
};

// ===================================================================
// ===================== VERIFY PAYMENT SIGNATURE =====================
// ===================================================================

const verifySignature = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courses,
    } = req.body;

    const userId = req.user.id;

    // ---------- VALIDATION ----------
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !Array.isArray(courses) ||
      !userId
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // ---------- SIGNATURE VERIFICATION ----------
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // ---------- ENROLL USER ----------
    const uid = new mongoose.Types.ObjectId(userId);
    let updatedUser = null;

    for (const courseId of courses) {
      // add student to course
      await Course.findByIdAndUpdate(courseId, {
        $addToSet: { studentsenrolled: uid },
      });

      // add course to user
      updatedUser = await User.findByIdAndUpdate(
        uid,
        { $addToSet: { courses: courseId } },
        { new: true }
      );
    }

    // ---------- FETCH COURSE NAMES ----------
    const enrolledCourses = await Course.find(
      { _id: { $in: courses } },
      { coursename: 1 }
    );

    const courseNames = enrolledCourses.map((course) => course.coursename);

    // ---------- SEND CONFIRMATION EMAIL ----------
    await mailSender(
      updatedUser.email,
      "🎉 Enrollment Successful – Welcome to StudyNotion",
      enrollmentEmailTemplate({
        userName: updatedUser.firstName,
        courses: courseNames,
        dashboardUrl: "http://localhost:3000/dashboard/enrolled-courses",
      })
    );

    return res.status(200).json({
      success: true,
      message: "Payment verified and courses enrolled successfully",
      userDetails: updatedUser,
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error verifying payment: " + error.message,
    });
  }
};

// ===================== EXPORT =====================
module.exports = {
  capturePayment,
  verifySignature,
};
