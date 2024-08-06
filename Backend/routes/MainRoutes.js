const express = require("express");
const routes = express.Router();
const { usersCommentsInThePost } = require("../controller/Comment");
const { LikeController } = require("../controller/LikeController");
const { PostController, postFetched } = require("../controller/PostController");
const { UnLikePost } = require("../controller/UnLike");

// start to creating the routes here
routes.post("/posts", PostController);
routes.post("/api/comment", usersCommentsInThePost);
routes.post("/api/likes", LikeController);
routes.get("/api/Fetch", postFetched);
routes.post("/api/unlike", UnLikePost);
// routes apply for login
module.exports = routes;
