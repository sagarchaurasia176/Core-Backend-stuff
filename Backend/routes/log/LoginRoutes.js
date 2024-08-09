const express = require("express");
const LoginRoute = express.Router();
const { Singup } = require("../../controller/SingupJwt");
const { loginController } = require("../../controller/Login");

const {
  Authentication,
  isStudent,
  isInstructor,
} = require("../../middleware/Auths");

// Login Route
LoginRoute.post("/signup", Singup);
LoginRoute.post("/login", loginController);

//test routes only for auth checking
LoginRoute.get("/test", Authentication, (req, res) => {
  res.json({
    success: true,
    message: "protected routes for Authentication",
  });
});

// middleware routes for student
LoginRoute.get("/isStudent", Authentication, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "protected routes for student",
  });
});
// middleware routes for instructor
LoginRoute.get("/isInstructor", Authentication, isInstructor, (req, res) => {
  res.json({
    success: true,
    message: "protected routes for Instructor",
  });
});

module.exports = LoginRoute;
