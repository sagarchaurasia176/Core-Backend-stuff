const express = require("express");
const {
  LocalFileController,
} = require("../../controller/Clouds/LocalFileController");
const { ImageController } = require("../../controller/Clouds/ImageController");
const routerUploader = express.Router();

//upload routes apply here
routerUploader.post("/LocalStore", LocalFileController);
// Image COntroller apply here
routerUploader.post("/Image/cloud", ImageController);

//routes
module.exports = routerUploader;
