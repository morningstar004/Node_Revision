import { Post } from "../models/post_model.js";

const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;

    if (!name || !description || !age) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const post = await Post.create({ name, description, age });

    await post.save();
    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//read post

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update post
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, age } = req.body;
    // if (Object.keys(req.body).length === 0){
    //   return res.status(400).json({ message: "All fields are required" });
    // }
    if (!name || !description || !age) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const post = await Post.findByIdAndUpdate(
      id,
      { name, description, age },
      { new: true },
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export { createPost, getPosts, updatePost };
