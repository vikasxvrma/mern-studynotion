// here we will write all the routes for section
const express = require("express");
const sectionRoute = express.Router();
 

// import middlewares
const auth =require("../middlewares/auth");

//  import section handlers 
const {
  createSection,
  updateSection,
  deleteSection,
  fetchSections,
} = require("../controllers/Section");

// mount the handler 
//SECTION
sectionRoute.post("/createsection/:courseId", auth, createSection);
sectionRoute.put("/updatesection/:courseId/:sectionId", auth, updateSection);
sectionRoute.delete("/deletesection/:sectionId/:courseId", auth, deleteSection);
sectionRoute.get("/fetchsections/:courseId", fetchSections);


module.exports= sectionRoute;



