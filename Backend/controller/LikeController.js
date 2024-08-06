const BlogPost = require("../model/BlogSchema");
const likes = require("../model/LikeSchema");

// exports the Like Controller here
exports.LikeController = async (req, res) => {
  try {
    const { posts, userName } = req.body;

    if (!posts || !userName) {
      return res.status(400).json({
        success: false,
        message: "Posts and userName are required",
      });
    }

    //create the like
    const likeCreation = await likes.create({ posts, userName });
    //push this like to the post
    const likePushToPost = await BlogPost.findByIdAndUpdate(
      posts,
      {
        $push: { likes: likeCreation },
      },
      { new: true }
    )
      .exec();
    // like update the post

    return res.status(200).json({
      success: true,
      message: "Like added successfully",
      likePushToPost
    });
  } catch (er) {
    return res.status(500).json({
      success: false,
      message: "Internal server error at post-controller",
      error: er.message,
    });
  }
};
