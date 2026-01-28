const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  gender: {
    type: String,
  },
  about: {
    type: String,
    maxLength: 200,
  },
  phone: {
    type: String,
    minLength: 10,
    maxLength: 10,
  },
  dob: {
    type: String,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
