const express = require("express");
const {
  LocalFileController,
} = require("../../controller/Clouds/LocalFileController");
const { ImageController } = require("../../controller/Clouds/ImageController");
const { VideoController } = require("../../controller/Clouds/VideoController");
const routerUploader = express.Router();

//upload routes apply here
routerUploader.post("/LocalStore", LocalFileController);
// Image COntroller apply here
routerUploader.post("/Image/cloud", ImageController);
routerUploader.post('/video/uploader',VideoController);
//routes
module.exports = routerUploader;
