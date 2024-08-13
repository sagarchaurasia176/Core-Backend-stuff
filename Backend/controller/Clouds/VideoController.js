//Cloud Media apply here
const CloudMedia = require("../../model/cloud/MediaSchema");
const cloudinary = require("cloudinary").v2;
//Config apply here
require("dotenv").config();
//cloudinary config apply here so we gets
cloudinary.config({
  cloud_name: process.env.Cloudinary_Name,
  api_key: process.env.Cloudinary_Api,
  api_secret: process.env.Cloudinary_Secret,
});

//check the fileformat
function isFileFormat(types, fileExtension) {
    return types.includes(fileExtension);
}

//create the function to upload the cloudinary
async function uploadFileToCloud(file, folder) {
  const option = { folder };
  option.resource_type = 'auto'
  return await cloudinary.uploader.upload(file.tempFilePath, option);
}

//Vide Controller exports here
exports.VideoController = async (req, res) => {
  try {
    //req too the client
    const { name, tag } = req.body;
    //express- upload the server
    const fileUploadToTheServer = req.files.videos;
    console.log(fileUploadToTheServer);
    //validate to the server
    if (!fileUploadToTheServer) {
      return res.status(404).json({
        success: false,
        message: "Video not stored into the server | Kindly check",
      });
    }
    //check the file format
    const checkFileFormat = ["mp4", "mov", "mp3" ,'gif'];
    const fileExtensionMatching = fileUploadToTheServer.name
      .split(".")[1]
      .toLowerCase();
    // type and the file format conditions here so we get
    if (!isFileFormat(checkFileFormat, fileExtensionMatching)) {
      return res.status(404).json({
        success: false,
        message: "File Format not matched!",
        error: er.message,
      });
    }

    //used the cloudinary uploader()
    const uploadedTheVideoToTheCloud = await uploadFileToCloud(
      fileUploadToTheServer,"pyp"
    );

    if (!uploadedTheVideoToTheCloud) {
      return res.status(404).json({
        success: false,
        message: "video not uploaded!",
        error: er.message,
      });

    }
    //create the entry
    const videoTable = await CloudMedia.create({ name, tag });
    return res.status(200).json({
      success: true,
      message: "video  uploaded to cloud succesfully !",
      data: videoTable,
      Url: uploadedTheVideoToTheCloud.secure_url,
    });



  } catch (er) {
    return res.status(504).json({
      success: false,
      message: "video not uploaded to cloud might be some errors !",
      error: er.message,
    });
  }
};
