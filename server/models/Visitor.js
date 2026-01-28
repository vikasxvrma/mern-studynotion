// model for visitor
const mongoose = require("mongoose");
const visitorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  message: {
    type: String,
    maxLength: 200,
    required: true,
  },
});

module.exports = mongoose.model("Visitor", visitorSchema);
