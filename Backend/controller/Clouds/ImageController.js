const CloudMedia = require("../../model/cloud/MediaSchema");
//Now we've to start and send the image
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

//cloudinary config apply here so we gets
cloudinary.config({
  Cloudinary_Api: process.env.Cloudinary_Api,
  Cloudinary_Secret: process.env.Cloudinary_Secret,
  Cloudinary_Name: process.env.Cloudinary_Name,
});
//Image Controller apply there so we get

//validation for file format
const isFileFormat = async (fileType, fileExtensionName) => {
  fileExtensionName.includes(fileType);
};

//upload the image to the cloud so we get
const uploadImage = async (ImageUploadfile, Folder) => {
  const options = { Folder };
  await cloudinary.uploader.upload(ImageUploadfile.tempPath, options);
};

//Image Controller here
exports.ImageController = async (req, res) => {
  try {
    // pending apply here
    const { name, tag, email } = req.body;
    console.log(name, tag, email);

    //express file-upload method here !
    const fileChek = req.files.Img;

    //fILeFormat supported
    const fileFormatTypeSupported = ["jpg", "png", "jpeg"];
    const fileExtensionName = fileChek.name.split(".")[1].toLowerCase();

    //validation for file format here so we get,
    if (!isFileFormat(fileFormatTypeSupported, fileExtensionName)) {
      return res.status(404).json({
        success: false,
        message: "File not Supported ! Kindly used another Img",
        error: er.message,
      });
    }
    //Now start to upload the image
    const cloudinaryResponseFromTheServer = await uploadImage(
      fileChek,
      "nodemailer"
    );
    console.log(cloudinaryResponseFromTheServer + "cloud response server");

    //create entry into the Db
    const MediaUploadedToTheServer = await CloudMedia.create({
      name,
      tag,
      email,
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
      message: "File not uploaded to cloud",
      error: er.message,
    });
  }
};
