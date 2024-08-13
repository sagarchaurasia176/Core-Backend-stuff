const cloudinary = require("cloudinary").v2;
require("dotenv").config();

//cloud config
const MediaTranseferToCloud = async (req, res) => {
  try {
    cloudinary.config({
      API: process.env.Cloudinary_Api,
      Secret: process.env.Cloudinary_Secret,
      Name: process.env.Cloudinary_Name,
    });
  } catch (er) {
    return res.json({
      success: false,
      message: "cloudinary not worked",
      error: er.message,
    });
  }
};
//exports
module.exports = MediaTranseferToCloud;
