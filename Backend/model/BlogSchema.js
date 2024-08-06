const mongoose = require("mongoose");
// create the blog post
const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "likes",
    },
  ],

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
  ],

  unlike: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "unLike",
    },
  ],
});
// exports the blog post
module.exports = mongoose.model("Blog", BlogSchema);
