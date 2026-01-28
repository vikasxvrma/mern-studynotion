const mongoose = require("mongoose");

const ratingandreviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  comment: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", 
    required: true
  },
});

module.exports = mongoose.model("RatingAndReview", ratingandreviewSchema);
