const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  coursename: {
    type: String,
    maxLength: 50,
    required: true,
  },
  coursedescription: {
    type: String,
    maxLength: 500,
    required: true,
  },
  whatyouwilllearn: {
    type: String,
    required: true,
  },
  ratingandreview: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    },
  ],
  sections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
  price: {
    type: Number,
    required: true,
  },

  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  thumbnail: {
    type: String,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  studentsenrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  requirements: {
    type: [String],
    required: true,
    default: [],
  },
  status: {
    type: String,
    enum: ["DRAFT", "PUBLISHED"],
    default: "DRAFT",
  },
});

module.exports = mongoose.model("Course", courseSchema);
