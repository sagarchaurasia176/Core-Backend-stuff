const { response } = require("express");
const CloudMedia = require("../../model/cloud/MediaSchema");
//Now we've to start and send the image
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

//cloudinary config apply here so we gets
cloudinary.config({
  cloud_name: process.env.Cloudinary_Name,
  api_key: process.env.Cloudinary_Api,
  api_secret: process.env.Cloudinary_Secret,
});

//validation for file format
const isFileFormat = async (fileType, fileExtensionName) => {
      fileType.includes(fileExtensionName);
};

//upload the image to the cloud so we get
const uploadImage = async (ImageUploadfile, Folder) => {
  const options = { Folder };
  //here temp => is the server name of the express file upload
  // await cloudinary.uploader.upload(ImageUploadfile.tempFileDir, options);
  return await cloudinary.uploader.upload(
    ImageUploadfile.tempFilePath,
    options
  );
};

//Image Controller here
exports.ImageController = async (req, res) => {
  try {
    // pending apply here
    const { name, tag, email } = req.body;
    console.log(name, tag, email);

    //express file-upload method here !

    const fileChek = req.files.Images;
    //fILeFormat supported
    const fileFormatTypeSupported = ["jpg", "png", "jpeg"];

    //here we delete the .JPG => And then convert it into the lowerscase !
    const fileExtensionName = fileChek.name.split(".")[1].toLowerCase();

    if (!fileChek) {
      return res.json({
        success: false,
        message: "file missed",
      });
    }

    //validation for file format here so we get,
    if (!isFileFormat(fileFormatTypeSupported, fileExtensionName)) {
      return res.status(404).json({
        success: false,
        message: "File not Supported ! Kindly used another Img",
        error: er.message,
      });
    }

    //Now start to upload the image
    const cloudinaryResponseFromTheServer = await uploadImage(fileChek, "pyp");

    //Cloudinary response to the server
    console.log(cloudinaryResponseFromTheServer + "cloud response server");
    //create entry into the Db
    const MediaUploadedToTheServer = await CloudMedia.create({
      name,
      tag,
      email,
      //The data is basically comes from the file and that is media uploaded to the server
      Url: cloudinaryResponseFromTheServer.secure_url,
    });

    // returnn the respone
    return res.status(200).json({
      success: true,
      message: "File uploaded to cloud",
      data: MediaUploadedToTheServer,
    });

    // cloudinary.uploader.upload()
  } catch (er) {
    return res.status(404).json({
      success: false,
      message: "File not uploaded to cloud might be some errors !",
      error: er.message,
    });
  }
};
