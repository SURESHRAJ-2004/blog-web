import express from "express";
import Post from "../models/Post.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find().populate("author", "username");
  res.json(posts);
});

// Create post
router.post("/", protect, async (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content, author: req.user });
  await post.save();
  res.json(post);
});

export default router;
