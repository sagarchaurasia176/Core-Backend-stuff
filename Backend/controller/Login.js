const AuthSchema = require("../model/AuthSchema");
//login controller apply here
const bcrypt = require("bcrypt");
const jwt_token = require("jsonwebtoken");
require("dotenv").config();

// login controller apply first
exports.loginController = async (req, res) => {
  try {
    const { name, password, role } = req.body;
    if (!name || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields",
      });
    }
    //check name and role
    // creome the creation at db
    let checkNameAndRoleExist = await AuthSchema.findOne({ name });
    if (!checkNameAndRoleExist) {
      return res.status(400).json({
        success: false,
        message: "kindly Singup First !",
      });
    }

    try {
      //compare the password here
      let hashThePassowrd = await bcrypt.compare(
        password,
        checkNameAndRoleExist.password
      );

      //payload
      const payload = {
        id: checkNameAndRoleExist._id,
        name: checkNameAndRoleExist.name,
        role: checkNameAndRoleExist.role,
      };
      //genetate the jwt token
      const token = jwt_token.sign(payload, process.env.SECRET_TOKEN, {
        expiresIn: "1h",
      });
      //Now you have to add some values into the object so we gets
      checkNameAndRoleExist = checkNameAndRoleExist.toObject();
      checkNameAndRoleExist.token = token;
      checkNameAndRoleExist.password = undefined;

      // create the cookies first so we get
      let options = {
        maxAge: 1000 * 60 * 15, // would expire after 15 minutes
        httpOnly: true, // The cookie only accessible by the web server
      };
      res.cookie("auths", token, options).status(200).json({
        success: true,
        message: "login succesfully",
        checkNameAndRoleExist,
        token,
      });
      return res.json({
        success: true,
        message: "data stored",
        dbCreation,
      });

    }
    
    
    catch (er) {
      return res.status(400).json({
        success: false,
        message: "Password invalid !",
        error: er.message,
      });
    }
  } catch (er) {
    return res.status(400).json({
      success: false,
      message: "Please enter all fields",
      error: er.message,
    });
  }
};
