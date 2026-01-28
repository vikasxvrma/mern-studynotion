const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course");

// ================= UPDATE COURSE PROGRESS =================
const updateCourseProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, subSectionId } = req.body;

    if (!courseId || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "courseId and subSectionId are required",
      });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Find or create progress doc
    let progress = await CourseProgress.findOne({
      courseId,
      userId,
    });

    if (!progress) {
      progress = await CourseProgress.create({
        courseId,
        userId,
        completedVideos: [subSectionId],
      });
    } else {
      if (!progress.completedVideos.includes(subSectionId)) {
        progress.completedVideos.push(subSectionId);
        await progress.save();
      }
    }

    return res.status(200).json({
      success: true,
      data: progress.completedVideos,
      message: "Course progress updated",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating progress: " + error.message,
    });
  }
};

module.exports = { updateCourseProgress };
