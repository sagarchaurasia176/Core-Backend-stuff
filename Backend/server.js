const express = require("express");
const app = express();
const routes = require("./routes/MainRoutes");
const LoginRoute = require("./routes/log/LoginRoutes");
require("dotenv").config();
const dbConnection = require("./config/DbConnnection");

//file upload  in the server
const fileUpload = require("express-fileupload");

//cookies parser
const cookieParser = require("cookie-parser");
// Environment variable configuration
const port = process.env.PORT || 8000;

//cloudinary for cloud purpose
const cloudinary = require("./config/Cloudinary");
const routerUploader = require("./routes/upload/UploadRoutes");

// Middleware for parsing JSON bodies
app.use(express.json());
//cookie-parser
app.use(cookieParser());

//file upload to the cloud here
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Database connection
dbConnection();

//cloudinary fuction called
cloudinary();

// Server status route
app.get("/", (req, res) => {
  res.send("Nodemailer server running!");
});

// Blog routes
app.use("/api/blog", routes);
// Authentication routes
app.use("/api/auth", LoginRoute);

//cloudinary routes
app.use("/api/upload", routerUploader);
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
