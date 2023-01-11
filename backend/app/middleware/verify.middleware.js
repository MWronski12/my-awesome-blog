import { db } from "../models/index.js";

const verifySignUpParameters = async (req, res, next) => {
  // Check if all required fields are present
  if (
    req.body.username === undefined ||
    req.body.email === undefined ||
    req.body.password === undefined
  ) {
    res
      .status(404)
      .send({ status: "error", message: "Bad request parameters" });
  }

  // Check if username is unique
  let usernameIsUnique =
    (await db.User.findOne({
      where: { username: req.body.username },
    })) === null;

  if (!usernameIsUnique) {
    return res
      .status(409)
      .send({ status: "error", message: "Username already in use" });
  }

  // Check if email is unique
  let emailIsUnique =
    (await db.User.findOne({
      where: { email: req.body.email },
    })) === null;

  if (!emailIsUnique) {
    return res
      .status(409)
      .send({ status: "error", message: "Email already in use" });
  }

  next();
};

const verifySignInParameters = (req, res, next) => {
  // Check if all required fields are present
  if (
    (req.body.username === undefined && req.body.email === undefined) ||
    req.body.password === undefined
  ) {
    res
      .status(404)
      .send({ status: "error", message: "Bad request parameters" });
  } else {
    next();
  }
};

const verifyCreatePostParameters = (req, res, next) => {
  // Check if all required fields are present
  if (req.body.title === undefined || req.body.content === undefined) {
    res
      .status(404)
      .send({ status: "error", message: "Bad request parameters" });
  } else {
    next();
  }
};

const verifyCreateCommentParameters = (req, res, next) => {
  // Check if all required fields are present
  if (req.body.content === undefined) {
    res
      .status(404)
      .send({ status: "error", message: "Bad request parameters" });
  } else {
    next();
  }
};

const verifyGrantRoleParameters = (req, res, next) => {
  if (req.body.roleId === undefined || req.body.userId === undefined) {
    res
      .status(404)
      .send({ status: "error", message: "Bad request parameters" });
  } else {
    next();
  }
};

export {
  verifySignUpParameters,
  verifySignInParameters,
  verifyCreatePostParameters,
  verifyCreateCommentParameters,
  verifyGrantRoleParameters,
};
