// here we will write all the routes for Course
const express = require("express");
const courseRoute = express.Router();
const auth = require("../middlewares/auth");
const upload = require("../middlewares/multer");



//  import  course handlers
const {
  createCourse,
  fetchCourses,
  updateCourse,
  editCourseDetails,
  instructorCourses,
  deleteCourse,
  getPublicCourse,
  getInstructorCourse,
  getUserCourse,
} = require("../controllers/Course");
const {getAverageRate} =require("../controllers/RatingAndReview")
const { isInstructor, isStudent } = require("../middlewares/whoisthere");

// mount the handler
courseRoute.post("/create-course", auth,upload.single("thumbnail"), isInstructor, createCourse);
courseRoute.post("/update-course/:courseId", auth,upload.single("thumbnail"), isInstructor, updateCourse);
courseRoute.get("/fetch-courses",auth, fetchCourses);
courseRoute.get("/average-rating",auth, getAverageRate);
courseRoute.get("/course/:courseId", getPublicCourse);
courseRoute.get("/instructor/course/:courseId",auth,isInstructor, getInstructorCourse);
courseRoute.get("/user/course/:courseId",auth,isStudent, getUserCourse);
courseRoute.post("/editcourse-details/:courseId",auth, editCourseDetails);
courseRoute.get("/instructor/my-courses",auth,isInstructor, instructorCourses);
courseRoute.delete("/instructor/delete-course/:courseId",auth,isInstructor, deleteCourse);

module.exports = courseRoute;
