const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Profile = require("../models/Profile");
const User = require("../models/User");
const uploadFileToCloudinary = require("../utils/fileUploader");

// ======================= UPDATE PROFILE =======================
const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, gender, dob, about, phone } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // update profile fields
    await Profile.findByIdAndUpdate(
      user.additionalDetails,
      { gender, dob, about, phone },
      { new: true }
    );

    // update user fields
    await User.findByIdAndUpdate(
      userId,
      { firstName, lastName },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================= UPDATE PROFILE PICTURE =======================
const updateProfilePicture = async (req, res) => {
  try {
    const profilepic = req.file;
    const userId = req.user.id;

    if (!profilepic) {
      return res.status(400).json({
        success: false,
        message: "Profile picture is required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // upload to cloudinary
    const uploadResponse = await uploadFileToCloudinary(
      profilepic,
      "UserProfile",
      false
    );

    // update profile image
    await Profile.findByIdAndUpdate(
      user.additionalDetails,
      { image: uploadResponse.secure_url },
      { new: true }
    );

    // return updated user (SOURCE OF TRUTH)
    const updatedUser = await User.findById(userId).populate(
      "additionalDetails"
    );

    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("PROFILE PIC ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================= DELETE ACCOUNT =======================
// ======================= DELETE ACCOUNT =======================
const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    // ================= CHECK USER =================
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ================= REMOVE USER FROM COURSES =================
    await Course.updateMany(
      { studentsenrolled: userId },
      { $pull: { studentsenrolled: userId } }
    );

    // ================= DELETE PROFILE =================
    if (user.additionalDetails) {
      await Profile.findByIdAndDelete(user.additionalDetails);
    }

    // ================= DELETE USER =================
    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================= GET ENROLLED COURSES =======================


const getUserEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate({
      path: "courses",
      populate: {
        path: "sections",
        populate: { path: "subSections" },
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 🔥 attach progress to each course
    const coursesWithProgress = await Promise.all(
      user.courses.map(async (course) => {
        const progress = await CourseProgress.findOne({
          userId,
          courseId: course._id,
        });

        const totalLectures = course.sections.reduce(
          (acc, sec) => acc + sec.subSections.length,
          0
        );

        const completedCount = progress?.completedVideos.length || 0;

        return {
          ...course.toObject(),
          completedLectures: progress?.completedVideos || [],
          totalLectures,
          progressPercentage:
            totalLectures === 0
              ? 0
              : Math.round((completedCount / totalLectures) * 100),
        };
      })
    );

    return res.status(200).json({
      success: true,
      data: coursesWithProgress,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  updateProfile,
  updateProfilePicture,
  deleteAccount,
  getUserEnrolledCourses,
};
