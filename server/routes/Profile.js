// here we will write the route logic for profile 

const express = require("express");
const profileRoute= express.Router();
// import middlewares 
const auth = require("../middlewares/auth");
const upload = require("../middlewares/multer");

// now import all the handlers 

const {updateProfilePicture,updateProfile,deleteAccount, getUserEnrolledCourses} = require("../controllers/Profile");
// map all the routes 

profileRoute.post("/updateprofile",auth,updateProfile);
profileRoute.put("/update-profile-picture",auth,upload.single("profilepic"),updateProfilePicture);
profileRoute.delete("/deleteprofile",auth,deleteAccount)
profileRoute.get("/enrolled-courses",auth,getUserEnrolledCourses)

// export it 

module.exports = profileRoute;
