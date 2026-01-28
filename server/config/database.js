// here we are making connection with server to database which here is mongodb

// we need mongoose to make connection  with database

const mongoose = require("mongoose");

require("dotenv").config();
DATABASE_URL = process.env.DATABASE_URL;
//  ==============connection with db ===================
const dbConnect = () => {
  try {
    mongoose.connect(DATABASE_URL);
    console.log("connection established with database !");
  } catch (err) {
    console.log("error in establishing connection with database ");
    console.log(err.message);
    process.exit(1);
  }
};
module.exports = dbConnect;
