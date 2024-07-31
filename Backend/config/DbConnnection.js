const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully!");
  } catch (error) {
    // console.error("Database connection failed!");
    // console.error(`Error: ${error.message}`);
    console.log("db not connected");
    process.exit(1); // Exit the process with failure
  }
};

module.exports = dbConnection;
