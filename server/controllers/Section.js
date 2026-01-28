const Course = require("../models/Course");
const Section = require("../models/Section");

// ======================= CREATE SECTION =======================

const createSection = async (req, res) => {
  try {
    const { sectionName } = req.body;
    const { courseId } = req.params;

    console.log("BODY:", req.body);
    console.log("PARAMS:", req.params);

    if (!courseId || !sectionName) {
      return res.status(400).json({
        success: false,
        message: "Please provide section name and courseId",
      });
    }

    const newSection = await Section.create({ sectionName });

    await Course.findByIdAndUpdate(
      courseId,
      { $push: { sections: newSection._id } },
      { new: true }
    );

    const updatedCourse = await Course.findById(courseId).populate({
      path: "sections",
      populate: {
        path: "subSections",
      },
    });

    return res.status(200).json({
      success: true,
      data: updatedCourse,
    });
  } catch (error) {
    console.error("CREATE SECTION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================UPDATE SECTIONS =============================
const updateSection = async (req, res) => {
  try {
    const { newSectionName } = req.body;
    const { sectionId,courseId } = req.params;

    if (!newSectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Please provide sectionId and newSectionName",
      });
    }

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName: newSectionName },
      { new: true }
    ).populate("subSections");

    const updatedCourse = await Course.findById(courseId).populate({
      path: "sections",
      populate: {
        path: "subSections",
      },
    });

    return res.status(200).json({
      success: true,
      data: updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in updating section: " + error.message,
    });
  }
};

// ======================DELETE SECTIONS =============================
const deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.params;

    if (!sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Please provide sectionId and courseId",
      });
    }

    const deletedSection = await Section.findByIdAndDelete(sectionId);

    await Course.findByIdAndUpdate(courseId, {
      $pull: { sections: deletedSection._id },
    },{new:true});

    const updatedCourse = await Course.findById(courseId).populate({
      path: "sections",
      populate: {
        path: "subSections",
      },
    });

    return res.status(200).json({
      success: true,
      data: updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting section: " + error.message,
    });
  }
};

// ======================= FETCH SECTIONS FOR COURSE =======================

const fetchSections = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Please provide courseId",
      });
    }

    // Fetch course with populated sections + subsections
    const courseDetails = await Course.findById(courseId).populate({
      path: "sections",
      populate: {
        path: "subSections",
      },
    });
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      sections: courseDetails.sections,
      message: " ALL section fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching sections: " + error.message,
    });
  }
};

module.exports = { createSection, updateSection, deleteSection, fetchSections };
