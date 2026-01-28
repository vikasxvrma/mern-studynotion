const express = require("express");
const contactRoute = express.Router();

// import the handlers
const { contactUs } = require("../controllers/ContactUs");

// map route
contactRoute.post("/contactus", contactUs);

// export the route
module.exports = contactRoute;
