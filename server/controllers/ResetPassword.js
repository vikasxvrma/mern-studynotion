const User = require("../models/User");
const bcrypt = require("bcrypt");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
const resetPasswordEmailTemplate = require("../mail/templates/resetPasswordEmailtemplate");

// ========================= RESET PASSWORD TOKEN =========================

const ResetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email exists
    const isPresent = await User.findOne({ email });
    if (!isPresent) {
      return res.status(400).json({
        success: false,
        message: "Email is not registered with us",
      });
    }

    // Generate token
    const token = crypto.randomUUID();

    // Update user with token & expiry (5 mins)
    await User.findOneAndUpdate(
      { email },
      {
        token: token,
        resetpasswordexpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    // Create reset link
    const url = `http://localhost:3000/reset-password/${token}`;

    // Send email
    await mailSender(
      email,
      "🔐 Reset Your Password – StudyNotion",
      resetPasswordEmailTemplate({
        userName: "user",
        resetLink: `${url}`,
        expiryMinutes: 10,
      })
    );

    return res.status(200).json({
      success: true,
      message: "Reset link sent to your email successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while sending reset link",
    });
  }
};

// ========================= SET NEW PASSWORD =========================

const resetPassword = async (req, res) => {
  try {
    const { tokentochange, newPassword, confirmPassword } = req.body;
    // Validate input fields
    if (!tokentochange || !newPassword || !confirmPassword) {
      return res.status(403).json({ message: "Please fill all fields" });
    }

    // Check password match
    if (newPassword !== confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "Confirm password did not match!",
      });
    }

    // Find user using token
    const user = await User.findOne({ token: tokentochange });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token or user not found",
      });
    }

    // Check expiry
    if (user.resetpasswordexpires < Date.now()) {
      return res.status(401).json({
        success: false,
        message: "Reset link expired, try again",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password + clear token + expiry
    await User.findOneAndUpdate(
      { token: tokentochange },
      {
        password: hashedPassword,
        token: null,
        resetpasswordexpires: null,
      },
      { new: true }
    );

    // Send confirmation email to user
    try {
      await mailSender(
        user.email,
        "Password Changed",
        "Your password was successfully updated."
      );
    } catch (err) {
      console.log("Failed to send password update email:", err.message);
    }

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while changing password: " + error.message,
    });
  }
};

// ========================= EXPORTS =========================

module.exports = { ResetPasswordToken, resetPassword };
