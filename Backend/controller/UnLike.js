const BlogSchema = require("../model/BlogSchema");
const UnLikePost = require("../model/UnLikeSchema");

// Unlike Post
exports.UnLikePost = async (req, res) => {
  try {
    const { post, userName } = req.body;
    // users id
    const dbUnlikeCreation = await UnLikePost.create({ post, userName });
    // post name
    const dbUnlike = await BlogSchema.findByIdAndDelete(post, {
      $pull: {
        unlikes: dbUnlikeCreation._id,
      },
    }).exec();

    // username
    return res.status(200).json({
      success: true,
      message: "unlike added successfully",
      data: dbUnlike,
    });

    //   catch errors apply here
  } catch (er) {
    return res.status(500).json({
      success: false,
      message: "Internal server error at post-controller",
      error: er.message,
    });
  }
};
