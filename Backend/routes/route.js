const { usersCommentsInThePost } = require("../controller/Comment");
const { LikeController } = require("../controller/LikeController");
const { PostController, postFetched } = require("../controller/PostController");

const express = require("express");
const routes = express.Router();
// start to creating the routes here
routes.post("api/v1/post", PostController);
routes.post("api/v1/comment", usersCommentsInThePost);
routes.post("api/v1/Likes", LikeController);
routes.get("api/v1/postFetch", postFetched);

module.exports = routes;