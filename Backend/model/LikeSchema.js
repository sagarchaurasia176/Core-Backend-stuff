const mongoose = require("mongoose");
const LikeSchema = new mongoose.Schema({
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  userName: {
    type: String,
  },
});

module.exports = mongoose.model("likes", LikeSchema);
