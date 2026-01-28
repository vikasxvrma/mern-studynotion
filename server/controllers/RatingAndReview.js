const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const User = require("../models/User");
const mongoose = require("mongoose");

// ==================================================
// CREATE REVIEW
// ==================================================
const createRate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { comment, rate } = req.body;
    const { courseId } = req.params;
    console.log("REQ BODY 👉", req.body);
    console.log("REQ PARAMS 👉", req.params);
    console.log("REQ USER 👉", req.user);

    if (!comment || !rate || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Please provide comment, rating and courseId",
      });
    }
    const numericRate = Number(rate);

    if (Number.isNaN(numericRate)) {
      return res.status(400).json({
        success: false,
        message: "Rating must be a number",
      });
    }

    // Check user exists
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if course exists
    const courseDetails = await Course.findById(courseId);
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check enrollment
    const isEnrolled = courseDetails.studentsenrolled.some(
      (id) => id.toString() === userId
    );

    if (!isEnrolled) {
      return res.status(403).json({
        success: false,
        message: "Only enrolled users can rate this course",
      });
    }

    // Check if already reviewed
    const existingReview = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this course",
      });
    }

    // Create new review
    const newReview = await RatingAndReview.create({
      user: userId,
      course: courseId,
      comment,
      rating: numericRate,
    });

    // Push into course
    await Course.findByIdAndUpdate(courseId, {
      $push: { ratingandreview: newReview._id },
    });

    res.status(201).json({
      success: true,
      data: newReview,
      message: "Review added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating review: " + error.message,
    });
  }
};
// ==================================================
// UPDATE REVIEW
// ==================================================
const updateRate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { newcomment, newrate, reviewId } = req.body;

    if (!reviewId || !newcomment || !newrate) {
      return res.status(400).json({
        success: false,
        message: "Please provide reviewId, new comment & new rating",
      });
    }

    const review = await RatingAndReview.findOne({
      _id: reviewId,
      user: userId,
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found or not owned by user",
      });
    }

    review.comment = newcomment;
    review.rating = newrate;
    await review.save();

    return res.status(200).json({
      success: true,
      data: review,
      message: "Review updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating rating: " + error.message,
    });
  }
};

// ==================================================
// DELETE REVIEW
// ==================================================
const deleteRate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { reviewId } = req.body;

    if (!reviewId) {
      return res.status(400).json({
        success: false,
        message: "Please provide reviewId",
      });
    }

    const review = await RatingAndReview.findOne({
      _id: reviewId,
      user: userId,
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found or not owned by user",
      });
    }

    await RatingAndReview.findByIdAndDelete(reviewId);

    // Remove from course
    await Course.findByIdAndUpdate(review.course, {
      $pull: { ratingandreview: reviewId },
    });

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting rating: " + error.message,
    });
  }
};

// ==================================================
// GET ALL REVIEWS OF A COURSE
// ==================================================
const getAllRate = async (req, res) => {
  try {
    const { courseId } = req.params;

    const reviews = await RatingAndReview.find({ course: courseId })
      .populate("user", "firstname lastname email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      reviews,
      message: "Reviews fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching reviews: " + error.message,
    });
  }
};

// ==================================================
// GET ALL REVIEWS OF ALL COURSES
// ==================================================
const getAllRateAndReveiws = async (req, res) => {
  try {
    const reviews = await RatingAndReview.find({})
      .populate({
        path: "user",
        select: "firstName lastName email additionalDetails",
        populate: {
          path: "additionalDetails",
          select: "image",
        },
      })
      .populate("course", "coursename")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: reviews,
      message: "ALL Reviews fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching reviews: " + error.message,
    });
  }
};


// ==================================================
// GET AVERAGE RATING OF A COURSE
// ==================================================
const getAverageRate = async (req, res) => {
  try {
    const { courseId } = req.params;

    const result = await RatingAndReview.aggregate([
      {
        $match: { course: new mongoose.Types.ObjectId(courseId) },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(200).json({
        success: true,
        average: 0,
        count: 0,
        message: "No ratings yet",
      });
    }

    return res.status(200).json({
      success: true,
      average: Number(result[0].averageRating.toFixed(1)),
      count: result[0].count,
      message: "Average rating calculated",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error calculating rating: " + error.message,
    });
  }
};

module.exports = {
  createRate,
  updateRate,
  deleteRate,
  getAllRate,
  getAverageRate,
  getAllRateAndReveiws,
};
