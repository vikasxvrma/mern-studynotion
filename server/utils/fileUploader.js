const cloudinary = require("cloudinary").v2;

const uploadFileToCloudinary = async (file, folder, isVideo = false) => {
  try {
    if (!file || !file.path) {
      throw new Error("File path missing");
    }

    const options = {
      folder,
      resource_type: isVideo ? "video" : "image",
    };

    const response = await cloudinary.uploader.upload(file.path, options);
    return response;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw error;
  }
};

module.exports = uploadFileToCloudinary;
