const CloudMedia = require("../../model/cloud/MediaSchema");
//Now we've to start and send the image
const cloudinary = require('cloudinary').v2;

//Image Controller apply there so we get
exports.ImageController = async (req, res) => {
  try {
    // pending apply here
    const {name , tag , Url , email} = req.body;
    //validation for file format
    //create entry into 
    // cloudinary.uploader.upload()


    



  } catch (er) {
    return res.status(404).json({
      success: false,
      message: "File not uploaded to cloud",
      error: er.message,
    });
  }
};
