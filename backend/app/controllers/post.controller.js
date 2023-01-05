import { db } from "../models/index.js";

const getAllPosts = async (req, res) => {
  try {
    const posts = await db.Post.findAll();
    res.status(200).send({ status: "success", data: posts });
  } catch (e) {
    res.status(500).send({ status: "error", message: e.message });
  }
};

const createPost = async (req, res) => {
  try {
    const post = await db.Post.create({ ...req.body, userId: req.userId });
    res.status(201).send({ status: "success", data: post });
  } catch (e) {
    res.status(500).send({ status: "error", message: e.message });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await db.Post.findByPk(req.params.id);
    res.status(200).send({ status: "success", data: post });
  } catch (e) {
    res.status(500).send({ status: "error", message: e.message });
  }
};

const updatePost = async (req, res) => {
  try {
    let post = await db.Post.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (post === null) {
      res.status(404).send("Not found");
      return;
    }
    post = { ...post, ...req.body };
    res.status(200).send({ status: "success", data: post });
  } catch (e) {
    res.status(500).send({ status: "error", message: e.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await db.Post.findByPk(req.params.postId);
    await db.Post.destroy({
      where: {
        id: post.id,
      },
    });
    res.status(204).send({ status: "success", data: post });
  } catch (e) {
    res.status(500).send({ status: "error", message: e.message });
  }
};

export { getAllPosts, createPost, getPost, updatePost, deletePost };
