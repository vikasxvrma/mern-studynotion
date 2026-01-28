const express = require("express");
const ratingRoute = express.Router();
const { getAverageRate, createRate, updateRate, getAllRateAndReveiws } = require("../controllers/RatingAndReview");
const auth = require("../middlewares/auth");
const { isStudent } = require("../middlewares/whoisthere");

ratingRoute.get("/getaveragerate/:courseId", getAverageRate);
ratingRoute.get("/getallratings", getAllRateAndReveiws);
ratingRoute.post("/saverating/:courseId",auth,isStudent,createRate);
ratingRoute.put("/updaterating",auth,isStudent,updateRate);

module.exports = ratingRoute;
