import { db } from "../models/index.js";

const getAllPosts = async (req, res) => {
  try {
    let posts = await db.Post.findAll({
      include: { model: db.User, attributes: ["username"] },
    });
    res.status(200).send({ posts });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const createPost = async (req, res) => {
  try {
    const post = await db.Post.create({ ...req.body, userId: req.userId });
    res.status(201).send({ post });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await db.Post.findByPk(req.params.id, {
      include: { model: db.User, attributes: ["username"] },
    });
    res.status(200).send({ post });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const updatePost = async (req, res) => {
  try {
    // Fetch post
    let post = await db.Post.findOne({
      where: {
        id: req.params.id,
      },
    });

    // Post doesn't exist
    if (post === null) {
      res.status(404).send({ message: "Not found" });
      return;
    }

    // Update post data
    post.dataValues = { ...post.dataValues, ...req.body };
    await post.save();
    res.status(200).send({ post });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const deletePost = async (req, res) => {
  try {
    // Fetch post
    const post = await db.Post.findByPk(req.params.id);

    // Post doesn't exist
    if (post === null) {
      res.status(404).send({ message: "Not found" });
      return;
    }

    // Delete post
    await db.Post.destroy({
      where: {
        id: post.id,
      },
    });
    res.status(200).send({ post });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export { getAllPosts, createPost, getPost, updatePost, deletePost };
