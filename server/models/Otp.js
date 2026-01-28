const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpEmailTemplate = require("../mail/templates/otpEmailTemplate");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otpvalue: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 10 * 60 * 1000, //3 minute
  },
});

//  whatever we write before model creation and after schema creation
// that will run while creating a model
// email sender
async function sendemailverification(email, otp) {
  try {
     await mailSender(
      email,
      "🔐 Verify Your Email – OTP Code",
      otpEmailTemplate({
        userName: "User",
        otp: otp,           
        expiryMinutes: 10,
      })
    );
    console.log("otp sent successfully ");
  } catch (err) {
    console.log("could not send otp");
    console.log(err.message);
  }
}

// PRE hook this is called pre hook , which is like before save in database
otpSchema.pre("save", async function () {
  await sendemailverification(this.email, this.otpvalue);
});

module.exports = mongoose.model("Otp", otpSchema);
