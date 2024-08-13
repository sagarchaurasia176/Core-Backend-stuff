const CloudMedia = require("../../model/cloud/MediaSchema");

// Local File Controller apply here
exports.LocalFileController = async (req, res) => {
  try {
    // Syntax of getting the files
    const file = req.files.file;
    console.log("File ", file);

    // Create the directory first
    let fileDirectory =
      __dirname + "file" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("Your file directory extension", fileDirectory);

    // Move the file
    file.mv(fileDirectory, (er) => {
      console.log("error", er);
    });
    // Otherwise send success response
    return res.json({
      success: true,
      message: "File uploaded to local folder",
    });
  } catch (er) {
    return res.status(404).json({
      success: false,
      message: "File not uploaded to local",
      error: er.message,
    });
  }
};
