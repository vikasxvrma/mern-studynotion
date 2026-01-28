const  Course  =require("../models/Course");
const  Tag  =require("../models/Tag");


// ================ CREATE TAG ==============
const createTag = async (req, res) => {
  try {
    const { tagname, courseId } = req.body;

    if (!tagname || !courseId) {
      return res.status(400).json({
        success: false,
        message: "tagname and courseId are required",
      });
    }

    const courseDetails = await Course.findById(courseId);
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Create tag
    const newTag = await Tag.create({ tagname });

    // 🔥 Attach tag to course
    courseDetails.tags.push(newTag._id);
    await courseDetails.save();

    return res.status(200).json({
      success: true,
      data: newTag,
      message: "Tag created and added to course successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Tag creation failed: " + error.message,
    });
  }
};

module.exports= createTag;
