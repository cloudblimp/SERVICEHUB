const cloudinary = require("cloudinary");
const fileUplaodService = async (filepath) => {
  try {
    let options = {
      folder: "sdp",
      resourece_type: "auto",
      allowed_formats: ["png", "jpg", "jpeg"],
    };
    return await cloudinary.uploader.upload(filepath, options);
  } catch (error) {
    return error;
  }
};
module.exports = fileUplaodService;
