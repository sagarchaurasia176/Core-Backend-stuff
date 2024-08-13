const express = require("express");
const {
  LocalFileController,
} = require("../../controller/Clouds/LocalFileController");
const { ImageController } = require("../../controller/Clouds/ImageController");
const { VideoController } = require("../../controller/Clouds/VideoController");
const { QualityController } = require("../../controller/Clouds/QuailityController");
const routerUploader = express.Router();

//upload routes apply here
routerUploader.post("/LocalStore", LocalFileController);
// Image COntroller apply here
routerUploader.post("/Image/cloud", ImageController);
routerUploader.post('/video/uploader',VideoController); 
routerUploader.post('/Quality/Reduce/img',QualityController)
//routes
module.exports = routerUploader;
