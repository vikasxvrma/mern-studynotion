// here we will write all the routes for category
const express = require("express");
const categoryRoute = express.Router();
 
// import middlewares 
const auth = require("../middlewares/auth");
//  import category handlers 
const {
  fetchCategory,
  createCategory,
  categoryPageDetails,
  fetchSingleCategory,
} = require("../controllers/Category");

// mount them on routes 
// Categories
categoryRoute.post("/create-category", auth, createCategory);
categoryRoute.get("/fetch-category", fetchCategory);
categoryRoute.get("/single-category/:categoryId", fetchSingleCategory);
categoryRoute.get("/getcategorypagedetails/:categoryId", categoryPageDetails);


module.exports= categoryRoute;



