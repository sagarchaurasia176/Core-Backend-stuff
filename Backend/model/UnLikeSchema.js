const mongoose = require("mongoose");
// unlike post apply here
const unLikePost = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
  userName: {
    type: String, 
    required: true,
  },
});
module.exports = mongoose.model("unLike", unLikePost);
