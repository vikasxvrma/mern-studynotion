// here we will write all the routes for subsection
const express = require("express");
const subSectionRoute = express.Router();
const upload = require("../middlewares/multer");

// import middlewares
const auth = require("../middlewares/auth");

//  import  subsection handlers
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
  fetchAllSubSections,
  getSubSectionLecture,
} = require("../controllers/SubSection");
const { isStudent } = require("../middlewares/whoisthere");

// mount the handler
//SECTION
// Subsections
subSectionRoute.post(
  "/createsubsection/:sectionId",
  auth,
  upload.single("videofile"),
  createSubSection
);
subSectionRoute.put(
  "/updatesubsection/:sectionId/:subSectionId",
  auth,
  upload.single("videofile"),
  updateSubSection
);
subSectionRoute.delete(
  "/deletesubsection/:subsectionId/:sectionId",
  auth,
  deleteSubSection
);
subSectionRoute.get(
  "/fetchallsubsections/:sectionId",
  auth,
  fetchAllSubSections
);
subSectionRoute.get(
  "/course/:courseId/section/:sectionId/subsection/:subSectionId",
  auth,
  isStudent,
  getSubSectionLecture
);

module.exports = subSectionRoute;
