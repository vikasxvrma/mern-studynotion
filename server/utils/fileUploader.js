const cloudinary = require("cloudinary").v2;

const uploadFileToCloudinary = (fileBuffer, folder, isVideo = false) => {
  return new Promise((resolve, reject) => {
    const options = {
      folder,
      resource_type: isVideo ? "video" : "image",
    };

    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload failed:", error);
          return reject(error);
        }
        resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

module.exports = uploadFileToCloudinary;
