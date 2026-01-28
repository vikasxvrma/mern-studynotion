// here we will write handler function or controller for category creation

// first import the model
const Category = require("../models/Category");
const Course = require("../models/Course");

const createCategory = async (req, res) => {
  try {
    // fetch the data from the req
    const { categoryname, categorydescription } = req.body;
    //  validation
    if (!categoryname || !categorydescription) {
      return res.status(400).json({
        success: false,
        message: "please provide all the details for Category creation ",
      });
    }
    const category = await Category.create({
      categoryname,
      categorydescription,
    });

    return res.status(200).json({
      success: true,
      category,
      message: "category creation was successfull",
    });
  } catch (error) {
    console.log("there was an error in creating a category ");
    return res.status(500).json({
      success: false,
      message: "error occured :" + error.message,
    });
  }
};
const fetchCategory = async (req, res) => {
  try {
    const categories = await Category.find(
      {},
      { categoryname: true, categorydescription: true }
    );

    return res.status(200).json({
      success: true,
      categories,
      message: "All Categories wer fetched ",
    });
  } catch (error) {
    console.log("there was an error in fetching   categories ");
    return res.status(500).json({
      success: false,
      message: "error occured :" + error.message,
    });
  }
};
const fetchSingleCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const singleCategory = await Category.findById(categoryId);
    if (!singleCategory) {
      return res.status(404).json({
        success: false,
        data: singleCategory,
        message: " No such  Category exist  ",
      });
    }

    return res.status(200).json({
      success: true,
      data: singleCategory,
      message: " Category Details are fetched ",
    });
  } catch (error) {
    console.log("there was an error in fetching   category ");
    return res.status(500).json({
      success: false,
      message: "error occured :" + error.message,
    });
  }
};

const categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // ================= SELECTED CATEGORY =================
    const selectedCategory = await Category.findById(categoryId).populate({
      path: "courses",
      match: { status: "PUBLISHED" },
      populate: [
        { path: "ratingandreview" },
        { path: "instructor", populate: { path: "additionalDetails" } },
        { path: "category" },
      ],
    });

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // ================= DIFFERENT CATEGORIES =================
    const differentCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate({
        path: "courses",
        match: { status: "PUBLISHED" },
        populate: [
          { path: "ratingandreview" },
          { path: "instructor", populate: { path: "additionalDetails" } },
          { path: "category" },
        ],
      })
      .limit(5);

    // ================= TOP SELLING COURSES =================
    const topSellingCourses = await Course.find({ status: "PUBLISHED" })
      .sort({ studentsenrolled: -1 })
      .limit(5)
      .populate({ path: "instructor", populate: { path: "additionalDetails" } })
      .populate("ratingandreview")
      .populate("category");

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategories,
        topSellingCourses,
      },
      message: "Category page data fetched successfully",
    });
  } catch (error) {
    console.error("Category Page Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching category page details",
    });
  }
};

module.exports = {
  fetchSingleCategory,
  createCategory,
  fetchCategory,
  categoryPageDetails,
};
