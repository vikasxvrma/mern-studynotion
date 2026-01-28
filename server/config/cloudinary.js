// here we write the function to connect with cloudinary

const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const cloudinaryConnect = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log("connection with cloudinary established ");
  } catch (error) {
    console.log("there was an error in making connection with cloudinary");
    console.error(error);
  }
};

module.exports = cloudinaryConnect;
