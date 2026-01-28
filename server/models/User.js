const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 50,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 50,
    trim: true,
  },
  accountType: {
    type: String,
    enum: ["admin", "student", "instructor"],
    required: true,
    default: "student",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  confirmpassword: {
    type: String,
    trim: true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  courseprogress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseProgress",
    },
  ],
  token: {
    type: String,
  },
  resetpasswordexpires: {
    type: Date,
  },
});

module.exports = mongoose.model("User", userSchema);
