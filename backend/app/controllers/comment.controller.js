import { db } from "../models/index.js";

const getPostComments = async (req, res) => {
  try {
    const post = await db.Post.findByPk(req.params.postId);
    if (post === null) {
      return res.status(404).send({ message: "Not found" });
    }

    const comments = await db.Comment.findAll({
      where: { postId: post.id },
      include: { model: db.User, attributes: ["username"] },
    });

    res.status(200).send({ comments });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const createComment = async (req, res) => {
  try {
    const post = await db.Post.findByPk(req.params.postId);
    if (post === null) {
      return res.status(404).send({ message: "Not found" });
    }

    const comment = await db.Comment.create({
      ...req.body,
      userId: req.userId,
      postId: Number.parseInt(req.params.postId),
    });

    res.status(201).send({ comment });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const getComment = async (req, res) => {
  try {
    const comment = await db.Comment.findByPk(req.params.id, {include: { model: db.User, attributes: ["username"] }});
    if (comment === null) {
      return res.status(404).send({ message: "Not found" });
    }
    res.status(200).send({ comment });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const updateComment = async (req, res) => {
  try {
    // Fetch comment
    const comment = await db.Comment.findByPk(req.params.id);

    // Comment doesn't exist
    if (comment === null) {
      return res.status(404).send({ message: "Not found" });
    }

    // Must be ADMIN, MODERATOR OR OWNER
    if (
      req.userRole !== "ADMIN" &&
      req.userRole !== "MODERATOR" &&
      comment.userId !== req.userId
    ) {
      return res.status(403).send({ message: "Not authorized" });
    }

    // Update comment data
    comment.dataValues = { ...comment.dataValues, ...req.body };
    await comment.save();
    res.status(200).send({ comment });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    // Fetch post
    const comment = await db.Comment.findByPk(req.params.id);

    // Post doesn't exist
    if (comment === null) {
      res.status(404).send({ message: "Not found" });
      return;
    }

    // Must be ADMIN, MODERATOR OR OWNER
    const user = await db.User.findByPk(req.userId, { include: db.Role });
    let isAdminOrModerator = false;
    for (let role of user.roles) {
      if (
        role.dataValues.name === "ADMIN" ||
        role.dataValues.name === "MODERATOR"
      ) {
        isAdminOrModerator = true;
        break;
      }
    }
    if (comment.userId != req.userId && !isAdminOrModerator) {
      return res.status(403).send({ message: "Not authorized" });
    }

    // Delete post
    await db.Comment.destroy({
      where: {
        id: comment.id,
      },
    });
    res.status(200).send({ comment });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export {
  getPostComments,
  createComment,
  getComment,
  updateComment,
  deleteComment,
};
