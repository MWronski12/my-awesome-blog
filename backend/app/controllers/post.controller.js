import { db } from "../models/index.js";

const createPost = async (req, res) => {
  try {
    const post = await db.Post.create({ ...req.body, userId: req.userId });
    res.status(201).send({ status: "success", data: post });
  } catch (e) {
    res.status(500).send({ status: "error", message: e.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = db.Post.findByPk(req.params.postId);
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

export { createPost, deletePost };
