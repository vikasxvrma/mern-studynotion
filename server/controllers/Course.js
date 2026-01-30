const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress");
const uploadFileToCloudinary = require("../utils/fileUploader");
const { populate } = require("../models/Tag");
require("dotenv").config();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const RatingAndReview = require("../models/RatingAndReview");
const Tag = require("../models/Tag");
const { default: mongoose } = require("mongoose");

// ======================= CREATE COURSE =======================

const createCourse = async (req, res) => {
  try {
    const {
      coursename,
      coursedescription,
      whatyouwilllearn,
      price,
      category,
      tags,
      requirements,
    } = req.body;

    const thumbnailImage = req.file;

    if (
      !coursename ||
      !coursedescription ||
      !whatyouwilllearn ||
      !price ||
      !category ||
      !thumbnailImage
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const userId = req.user.id;
    const instructor = await User.findById(userId);
    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Invalid category",
      });
    }

    // ================= TAG HANDLING =================
    const parsedTags = tags ? JSON.parse(tags) : [];
    const tagIds = [];

    for (const tagName of parsedTags) {
      const trimmed = tagName.trim().toLowerCase();

      let tag = await Tag.findOne({ name: trimmed });

      if (!tag) {
        tag = await Tag.create({ name: trimmed });
      }

      tagIds.push(tag._id);
    }

    // ================= REQUIREMENTS =================
    const parsedRequirements = requirements ? JSON.parse(requirements) : [];

    // ================= THUMBNAIL =================
    const uploadedThumbnail = await uploadFileToCloudinary(
      thumbnailImage.buffer,
      process.env.FOLDER_NAME,
      false
    );

    // ================= CREATE COURSE =================
    const newCourse = await Course.create({
      coursename,
      coursedescription,
      whatyouwilllearn,
      price,
      category: categoryDetails._id,
      thumbnail: uploadedThumbnail.secure_url,
      instructor: instructor._id,
      tags: tagIds,                   
      requirements: parsedRequirements
    });

    await User.findByIdAndUpdate(instructor._id, {
      $push: { courses: newCourse._id },
    });

    await Category.findByIdAndUpdate(categoryDetails._id, {
      $push: { courses: newCourse._id },
    });

    return res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Course creation failed: " + error.message,
    });
  }
};

// ======================= DELETE COURSE =======================
const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const course = await Course.findById(courseId).populate("sections");
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (course.instructor.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this course",
      });
    }

    for (const section of course.sections) {
      await SubSection.deleteMany({ _id: { $in: section.subSections } });
      await Section.findByIdAndDelete(section._id);
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { courses: courseId },
    });

    await Category.findByIdAndUpdate(course.category, {
      $pull: { courses: courseId },
    });

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("DELETE COURSE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Course deletion failed",
    });
  }
};
// ======================= UPDATE  COURSE =======================

const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const {
      coursename,
      coursedescription,
      whatyouwilllearn,
      price,
      category,
      tags,
      requirements,
    } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "CourseId is required",
      });
    }

    // ================= FIND COURSE =================
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // ================= BASIC FIELD UPDATES =================
    if (coursename) course.coursename = coursename;
    if (coursedescription) course.coursedescription = coursedescription;
    if (whatyouwilllearn) course.whatyouwilllearn = whatyouwilllearn;
    if (price) course.price = price;

    // ================= CATEGORY UPDATE =================
    if (category) {
      const categoryDetails = await Category.findById(category);
      if (!categoryDetails) {
        return res.status(404).json({
          success: false,
          message: "Invalid category",
        });
      }
      course.category = categoryDetails._id;
    }

    // ================= TAGS (MERGE LOGIC) =================
    if (tags) {
      const parsedTags = JSON.parse(tags); // ["react", "node"]
      const newTagIds = [];

      for (const tagName of parsedTags) {
        const trimmed = tagName.trim().toLowerCase();
        if (!trimmed) continue;

        let tag = await Tag.findOne({ name: trimmed });
        if (!tag) {
          tag = await Tag.create({ name: trimmed });
        }

        newTagIds.push(tag._id.toString());
      }

      const existingTagIds = course.tags.map((id) => id.toString());

      // MERGE + REMOVE DUPLICATES
      course.tags = [
        ...new Set([...existingTagIds, ...newTagIds]),
      ];
    }

    // ================= REQUIREMENTS =================
    if (requirements) {
      course.requirements = JSON.parse(requirements);
    }

    // ================= THUMBNAIL =================
    if (req.file) {
      const uploadedThumbnail = await uploadFileToCloudinary(
        req.file.buffer,
        process.env.FOLDER_NAME,
        false
      );
      course.thumbnail = uploadedThumbnail.secure_url;
    }

    // ================= SAVE =================
    await course.save();

    // ================= RETURN UPDATED COURSE =================
    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "sections",
        populate: { path: "subSections" },
      })
      .populate("tags", "name")
      .populate("category", "categoryname");

    return res.status(200).json({
      success: true,
      data: updatedCourse,
      message: "Course updated successfully",
    });
  } catch (error) {
    console.error("UPDATE COURSE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ======================= FETCH ALL COURSES =======================

const fetchCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      { coursename: 1, price: 1, instructor: 1, thumbnail: 1 }
    )
      .populate("instructor", "firstName lastName  email ")
      .populate("category", "categoryname categorydescription")
      .exec();

    return res.status(200).json({
      success: true,
      data: allCourses,
      message: "All courses fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching courses: " + error.message,
    });
  }
};
// ====================== GET COURSE DETAILS ======================
const getPublicCourse = async (req, res) => {
  const { courseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }

  const course = await Course.findById(courseId)
    .populate({
      path: "instructor",
      select: "firstName lastName",
      populate: { path: "additionalDetails", select: "image" }
    })
    .populate("category", "categoryname categorydescription")
    .populate({
      path: "sections",
      populate: { path: "subSections", select: "title" }
    })
    .populate("ratingandreview")
    .select(
      "coursename coursedescription price whatyouwilllearn thumbnail sections instructor category ratingandreview studentsenrolled"
    );

  if (!course) {
    return res.status(404).json({ success: false, message: "Course not found" });
  }

  return res.json({ success: true, data: course });
};
// controllers/courseInstructor.js
const getInstructorCourse = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id;

  const course = await Course.findOne({
    _id: courseId,
    instructor: userId,
  })
    .populate({
      path: "sections",
      populate: { path: "subSections" }
    })
    .populate("tags")
    .populate("category");

  if (!course) {
    return res.status(403).json({
      success: false,
      message: "Not authorized or course not found",
    });
  }

  return res.json({ success: true, data: course });
};
// ====================getUser Course
const getUserCourse = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id;

  const course = await Course.findOne({
    _id: courseId,
    studentsenrolled: userId,
  })
    .populate({
      path: "sections",
      populate: { path: "subSections" },
    })
    .populate("tags")
    .populate("category")
    .populate({
      path: "ratingandreview",
      populate: {
        path: "user",
        select: "_id firstName lastName",
      },
    });

  if (!course) {
    return res.status(403).json({
      success: false,
      message: "Not authorized or course not found",
    });
  }

  const progress = await CourseProgress.findOne({
    userId,
    courseId,
  });

  return res.json({
    success: true,
    data: {
      course,
      completedVideos: progress?.completedVideos || [],
    },
  });
};


//  =====================UPDATE COURSE DETAILS==================
const editCourseDetails = async (req, res) => {
  try {
    const { status } = req.body;
    const { courseId } = req.params;
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required.",
      });
    }
    const courseDetails = await Course.findByIdAndUpdate(
      courseId,
      { status },
      { new: true }
    )
      .populate("studentsenrolled")
      .populate("ratingandreview")
      .populate({ path: "instructor", populate: { path: "additionalDetails" } })
      .populate("category", "name")
      .populate({
        path: "sections",
        populate: { path: "subSections" },
      })
      .exec();
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course details Updated successfully.",
      data: courseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Internal server error while fetching course details: " + error.message,
    });
  }
};
// =========================instructor specifi course
// ======================= FETCH ALL COURSES =======================
const instructorCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const instructor = await User.findById(userId)
      .populate({
        path: "courses",
        select: `
          coursename
          price
          thumbnail
          status
          createdAt
          studentsenrolled
        `,
      })
      .exec();

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: instructor.courses,
      message: "Instructor courses fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching instructor courses:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching instructor courses",
    });
  }
};



module.exports = {
  createCourse,
  updateCourse,
  fetchCourses,
  getPublicCourse,
  editCourseDetails,
  getInstructorCourse,
  instructorCourses,
  deleteCourse,
  getUserCourse
};
