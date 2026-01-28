const express = require("express");
const courseProgressRoute = express.Router();
const { updateCourseProgress } = require("../controllers/CourseProgress");
const auth = require("../middlewares/auth");


courseProgressRoute.post("/update-progress", auth, updateCourseProgress);

module.exports = courseProgressRoute;
