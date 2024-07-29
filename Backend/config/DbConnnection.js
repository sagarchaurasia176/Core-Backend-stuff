const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  if (!process.env.DB_URL) {
    console.error("DB_URL is not defined in environment variables.");
    process.exit(1); // Exit the process with failure
  }

  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
     
    });
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed!");
    console.error(`Error: ${error.message}`);
  
    process.exit(1); // Exit the process with failure
  }
};

module.exports = dbConnection;
