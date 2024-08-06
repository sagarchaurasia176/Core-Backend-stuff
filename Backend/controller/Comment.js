// This I take becuase that have used into the model
const CommentPost = require("../model/CommentSchema");
const userPost = require("../model/BlogSchema");
// usersCommentInThePost
exports.usersCommentsInThePost = async (req, res) => {
  try {
    // main try page apply here
    const { post, commentData, users } = req.body;
    // now to stored the data into the db
    const commentsSaveToDb = new CommentPost({
      post,
      commentData,
      users,
    });
    // now saved it
    const savedInDb = await commentsSaveToDb.save();
    // If I know the post id so I can easily update the post id from the comment []
    const postCommentUpdateIntoTheArrays = await userPost
      .findByIdAndUpdate(
        post,
        //  start to update its
        { $push: { comments: savedInDb._id } },
        { new: true }
        // for expanded the datas
      )
      .populate("comments")
      .exec();

    // if id not matched then comments not updated
    if (!postCommentUpdateIntoTheArrays) {
      return res.status(400).json({
        success: false,
        message: "you already comment , add comments to another post",
        error: er.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "comments updated",
      data: postCommentUpdateIntoTheArrays,
    });

    // error
  } catch (er) {
    return res.status(400).json({
      success: false,
      message: "Internal server error at comments-controller",
      error: er.message,
    });
  }
};
