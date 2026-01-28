const express = require("express");
const tagRoute = express.Router();

const createTag = require("../controllers/Tag");

tagRoute.post("/createtag", createTag);

module.exports = tagRoute;
