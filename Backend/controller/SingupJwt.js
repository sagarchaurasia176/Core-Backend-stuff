// JSON WEB-TOKEN
const bcrypt = require("bcrypt");
const auth = require("../model/AuthSchema");

// password encrypting apply here as we get
exports.Singup = async (req, res) => {
  try {
    const { name, password, role } = req.body;

    if (!name || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields",
      });
    }

    // already exist in the db or not
    const usersExist = await auth.findOne({ name});
    // usersExist apply here
    if (usersExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    // let's start to hash the password here
    let passwordHash = await bcrypt.hash(password, 10);
    // create the entry into the db
    const userLogin = await auth.create({
      name,
      password: passwordHash,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      userLogin,
    });
  } catch (er) {
    return res.status(500).json({
      success: false,
      message: "Internal server error at signup controller",
      error: er.message,
    });
  }
};
