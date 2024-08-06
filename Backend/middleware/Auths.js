const jwt = require("jsonwebtoken");
require("dotenv").config();
// Main authentication middleware
exports.Authentication = async (req, res, next) => {
  try {
    // Extract the JWT token from request body or cookies
    const jwtToken = req.body.token; // Corrected `req.cookie` to `req.cookies`
    if (!jwtToken) {
      return res.status(400).json({
        success: false,
        message: "JWT token is empty!",
      });
    }

    // Verify the token
    try {
      const tokenVerify = jwt.verify(jwtToken, process.env.SECRET_TOKEN);
      req.checkNameAndRoleExist = tokenVerify;
          // Move to the next middleware
    }
     catch (er) {
      return res.status(400).json({
        success: false,
        message: "Token invalid!",
        error: er.message,
      });
    }

    next();

  } catch (er) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while verifying the JWT!",
      error: er.message,
    });
  }
};

// Middleware to check if the user is a student
exports.isStudent = async (req, res, next) => {
  try {
    if (req.checkNameAndRoleExist.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This route is restricted to students!",
      });
    }
    next();
  } catch (er) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong in the student route!",
      error: er.message,
    });
  }
};

// Middleware to check if the user is an instructor
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.checkNameAndRoleExist.role !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This route is restricted to instructors!",
      });
    }
    next(); // Ensure to call next() to proceed to the next middleware
  } catch (er) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong in the instructor route!",
      error: er.message,
    });
  }
};
