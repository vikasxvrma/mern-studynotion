const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  categoryname: {
    type: String,
  },
  categorydescription:{
    type:String,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});
module.exports = mongoose.model("Category",categorySchema);
