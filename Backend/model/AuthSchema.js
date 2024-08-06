const mongoose = require("mongoose");
// schema apply here so we get
const AuthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Student", "Instructor"],
  },
});

// exports singup here
module.exports = mongoose.model('auth' , AuthSchema);
