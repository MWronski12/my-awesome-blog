import { db } from "../models/index.js";

const getPostComments = async (req, res) => {
  try {
    const post = await db.Post.findByPk(req.params.postId, {
      include: db.Comment,
    });
    if (post === null) {
      return res.status(404).send({ status: "error", message: "Not found" });
    }
    res.status(200).send({ status: "success", data: post.comments });
  } catch (e) {
    res.status(500).send({ status: "error", message: e.message });
  }
};

const createComment = async (req, res) => {
  try {
    const post = await db.Post.findByPk(req.params.postId);
    if (post === null) {
      return res.status(404).send({ status: "error", message: "Not found" });
    }
    const comment = await db.Comment.create({
      ...req.body,
      userId: req.userId,
      postId: req.params.postId,
    });
    res.status(201).send({ status: "success", data: comment });
  } catch (e) {
    res.status(500).send({ status: "error", message: e.message });
  }
};

const getComment = async (req, res) => {
  try {
    const comment = await db.Comment.findByPk(req.params.id);
    if (comment === null) {
      return res.status(404).send({ status: "error", message: "Not found" });
    }
    res.status(200).send({ status: "success", data: comment });
  } catch (e) {
    res.status(500).send({ status: "error", message: e.message });
  }
};

const updateComment = async (req, res) => {
  try {
    // Fetch comment
    const comment = await db.Comment.findByPk(req.params.id);

    // Comment doesn't exist
    if (comment === null) {
      return res.status(404).send({ status: "error", message: "Not found" });
    }

    // Must be ADMIN, MODERATOR OR OWNER
    if (
      req.userRole !== "ADMIN" &&
      req.userRole !== "MODERATOR" &&
      comment.userId !== req.userId
    ) {
      return res
        .status(403)
        .send({ status: "error", message: "Not authorized" });
    }

    // Update comment data
    comment.dataValues = { ...comment.dataValues, ...req.body };
    await comment.save();
    res.status(200).send({ status: "success", data: comment });
  } catch (e) {
    res.status(500).send({ status: "error", message: e.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    // Fetch post
    const comment = await db.Comment.findByPk(req.params.id);

    // Post doesn't exist
    if (comment === null) {
      res.status(404).send({ status: "error", message: "Not found" });
      return;
    }

    // Must be ADMIN, MODERATOR OR OWNER
    const user = await db.User.findByPk(req.userId, { include: db.Role });
    const userRoles = await user.getRoles();
    let isAdminOrModerator = false;
    for (let role of userRoles) {
      if (
        role.dataValues.name === "ADMIN" ||
        role.dataValues.name === "MODERATOR"
      ) {
        isAdminOrModerator = true;
        break;
      }
    }
    if (comment.userId != req.userId && !isAdminOrModerator) {
      return res
        .status(403)
        .send({ status: "error", message: "Not authorized" });
    }

    // Delete post
    await db.Comment.destroy({
      where: {
        id: comment.id,
      },
    });
    res.status(200).send({ status: "success", data: comment });
  } catch (e) {
    res.status(500).send({ status: "error", message: e.message });
  }
};

export {
  getPostComments,
  createComment,
  getComment,
  updateComment,
  deleteComment,
};
