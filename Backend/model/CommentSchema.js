const mongoose = require("mongoose");
// comment Post
const commentsPost = new mongoose.Schema({
 post:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
  commentData: {
    type: String,
    required: true,
  },
  users: {
    type: String,
  },
});

module.exports = mongoose.model("comments", commentsPost);
