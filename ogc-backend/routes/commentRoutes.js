const express = require("express");
const Comment = require("../model/mongodb/comment");
const { getUserDetails } = require("./profileRoutes");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/mongodb/user");

router.post("/comments", async (req, res) => {
  try {
    console.log("comment");
    
    const { postId, parentComment, content } = req.body;
    const token = req.header("Authorization");
    const userId = jwt.decode(token).userId;
    console.log(userId);
    
    //MongoDB
    const user = await User.findOne({
        _id: userId,
      });
    console.log(user);
    

    if (!user) {
      res.status(404).send({
        message: "User not found!",
      });
    }
    const username = user.username
    console.log(username);
    

    const comment = new Comment({ postId, parentComment, username, content });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Failed to post comment", error: error.message });
  }
});

// Get comments for a post
router.get("/comments/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments", err: error });
  }
});

module.exports = { router };
