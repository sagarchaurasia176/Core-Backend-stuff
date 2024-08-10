const jwt = require("jsonwebtoken");
require("dotenv").config();

// Main authentication middleware
exports.Authentication = async (req, res, next) => {
  try {
    // Corrected `req.cookie` to `req.cookies`
    const jwtToken = req.header("Authorization").replace("Bearer", "");
    console.log("header auth", jwtToken);

    //if token not present then
    if (!jwtToken) {
      return res.status(400).json({
        success: false,
        message: "JWT token is empty!",
      });
    }
    //jwt secret
    try {
      const jwtSecret = process.env.SECRET_TOKEN;
      //check the token first here
      const afterJwtVerifyTheOp = jwt.verify(jwtToken, jwtSecret);
      // check this existing token is matched or not !
      req.checkNameAndRoleExist = afterJwtVerifyTheOp;
      next();
    } catch (er) {
      return res.status(401).json({
        success: false,
        message: "Something went wrong in the token verify in auth page",
        error: er.message,
      });
    }
  } catch (er) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong in the auth middlewares",
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
