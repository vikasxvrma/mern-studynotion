const mongoose = require("mongoose");

const subsectionSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
  },
  timeduration: {
    type: String,
    // required: true,
  },
  videoUrl: {
    type: String,
  },
});

module.exports = mongoose.model("SubSection", subsectionSchema);
