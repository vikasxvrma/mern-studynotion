const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
    maxLength: 50,
    required: true,
  },
  subSections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
    },
  ],
  totallength: {
    type: String,
    // required: true,
  },
});

module.exports = mongoose.model("Section", sectionSchema);
