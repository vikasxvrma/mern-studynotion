// controllers/subSectionController.js

const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const uploadFileToCloudinary = require("../utils/fileUploader");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ======================= CREATE SUBSECTION =======================

const createSubSection = async (req, res) => {
  try {
    // fetch the data
    const { title, description } = req.body;
    const { sectionId } = req.params;
    // fetch the video file
    const videofile = req.file;

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("PARAMS:", req.params);

    // Validation
    if (!sectionId || !title || !description || !videofile) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide sectionId, title, description,videofile and timeduration.",
      });
    }

    // Check Section exists
    const sectionDetails = await Section.findById(sectionId);
    if (!sectionDetails) {
      return res.status(404).json({
        success: false,
        message: "Section not found.",
      });
    }
    //  upload video file to cloudinary
    const videofileuploaded = await uploadFileToCloudinary(
      videofile.buffer,
      process.env.FOLDER_NAME,
      true
    );
    // Create SubSection
    const newSubSection = await SubSection.create({
      title,
      description,
      videoUrl: videofileuploaded.secure_url,
    });

    // Push SubSection to Section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: { subSections: newSubSection._id },
      },
      { new: true }
    );
    console.log(updatedSection);
    const updatedCourse = await Course.findOne({
      sections: sectionId,
    }).populate({
      path: "sections",
      populate: { path: "subSections" },
    });

    return res.status(201).json({
      success: true,
      data: updatedCourse,
      message: "SubSection created successfully",
    });
  } catch (error) {
    console.log("CLOUDINARY ERROR:", error?.message);
    console.log(error?.response?.data);
    return res.status(500).json({
      success: false,
      message: "Error creating SubSection: " + error.message,
    });
  }
};

//  =======================UPDATE SUBSECTION =======================

const updateSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.params;
    const { title, description } = req.body;

    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "SubSection ID is required",
      });
    }

    let videoUrl;
    if (req.file) {
      const upload = await uploadFileToCloudinary(
        req.file.buffer,
        process.env.FOLDER_NAME,
        true
      );
      videoUrl = upload.secure_url;
    }

    const updatedSubSection = await SubSection.findByIdAndUpdate(
      subSectionId,
      {
        ...(title && { title }),
        ...(description && { description }),
        ...(videoUrl && { videoUrl }),
      },
      { new: true }
    );

    const updatedCourse = await Course.findOne({
      sections: sectionId,
    }).populate({
      path: "sections",
      populate: { path: "subSections" },
    });

    return res.status(201).json({
      success: true,
      data: updatedCourse,
      message: "SubSection updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating subsection: " + error.message,
    });
  }
};

//  =======================DELETE SUBSECTION =======================

const deleteSubSection = async (req, res) => {
  try {
    const { subsectionId, sectionId } = req.params;

    if (!subsectionId || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Please provide subsectionId and sectionId.",
      });
    }

    const deletedSubSection = await SubSection.findByIdAndDelete(subsectionId);

    await Section.findByIdAndUpdate(sectionId, {
      $pull: { subSections: deletedSubSection._id },
    });

    const updatedCourse = await Course.findOne(
      {
        sections: sectionId,
      },
      { new: true }
    ).populate({
      path: "sections",
      populate: { path: "subSections" },
    });

    return res.status(201).json({
      success: true,
      data: updatedCourse,
      message: "SubSections deleted  successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting SubSection: " + error.message,
    });
  }
};

// ======================= FETCH ALL SUBSECTIONS =======================

const fetchAllSubSections = async (req, res) => {
  try {
    const { sectionId } = req.params;

    if (!sectionId) {
      return res.status(400).json({
        success: false,
        message: "Please provide sectionId.",
      });
    }

    const sectionDetails = await Section.findById(sectionId)
      .populate("subSections")
      .exec();

    if (!sectionDetails) {
      return res.status(404).json({
        success: false,
        message: "Section not found.",
      });
    }

    const updatedCourse = await Course.findOne({
      sections: sectionId,
    }).populate({
      path: "sections",
      populate: { path: "subSections" },
    });

    return res.status(201).json({
      success: true,
      data: updatedCourse,
      message: "SubSections fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching subsections: " + error.message,
    });
  }
};

// ======================= FETCH single SUBSECTION =======================

const getSubSectionLecture = async (req, res) => {
  try {
    const { courseId, sectionId, subSectionId } = req.params;
    const userId = req.user.id;
    console.log(courseId,sectionId,subSectionId);

    if (!courseId || !sectionId || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters",
      });
    }

    // 1️⃣ Check course enrollment
    const course = await Course.findOne({
      _id: courseId,
      studentsenrolled: userId,
      sections: sectionId,
    });

    if (!course) {
      return res.status(403).json({
        success: false,
        message: "You are not enrolled in this course",
      });
    }

    // 2️⃣ Verify subsection belongs to section
    const section = await Section.findOne({
      _id: sectionId,
      subSections: subSectionId,
    });

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "SubSection does not belong to this section",
      });
    }

    // 3️⃣ Fetch lecture
    const subSectionDetails = await SubSection.findById(subSectionId);

    if (!subSectionDetails) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: subSectionDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching lecture: " + error.message,
    });
  }
};


module.exports = {
  createSubSection,
  fetchAllSubSections,
  deleteSubSection,
  updateSubSection,
  getSubSectionLecture
};
