const Blog = require("../model/BlogSchema");

// blogPost
exports.PostController = async (req, res) => {
  try {
    // just we've to stored the element to the db
    const { title, description } = req.body;
    //create the entry to the db here
    const createTheEntryToTheDb = await Blog.create({
      title,
      description,
    });

    return res.status(200).json({
      success: true,
      message: "Post updated succesfully !",
      createTheEntryToTheDb,
    });

    //   catch
  } catch (er) {
    return res.status(400).json({
      success: false,
      message: "Internal server error at post-controller",
      error: er.message,
    });
  }
};

// fetch all the post
exports.postFetched = async (req, res) => {
  try {
    const fetchAllTheBlog = await Blog.find();
    return res.status(200).json({
      success: true,
      message: "Post fetched succesfully !",
      data: fetchAllTheBlog,
    });
  } catch (er) {
    return res.status(500).json({
      success: false,
      message: "Internal server error at post-controller",
      error: er.message,
    });
  }
};
