import jwt from "jsonwebtoken";
import { db } from "../models/index.js";

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res
      .status(403)
      .send({ status: "error", message: "No token provided" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Not authorized",
      });
    }
    req.userId = decoded.userId;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.userId);
    const roles = await user.getRoles();
    for (let role of roles) {
      if (role === "ADMIN") {
        next();
        return;
      }
    }
    res.status(403).send("Not authorized");
  } catch (e) {
    res.status(500).send({ status: "error", message: e.message });
  }
};

const isModerator = async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.userId);
    const roles = await user.getRoles();
    for (let role of roles) {
      if (role === "MODERATOR") {
        next();
        return;
      }
    }
    res.status(403).send("Not authorized");
  } catch (e) {
    res.status(500).send({ status: "error", message: e.message });
  }
};

const isAdminOrModerator = async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.userId);
    const roles = await user.getRoles();
    for (let role of roles) {
      if (role === "MODERATOR" || role === "ADMIN") {
        next();
        return;
      }
    }
    res.status(403).send("Not authorized");
  } catch (e) {
    res.status(500).send({ status: "error", message: e.message });
  }
};

const isAdminOrModeratorOrOwner = async (req, res, next) => {
  let result = false;
  try {
    const user = await db.User.findByPk(req.userId);
    if (req.params.id === user.id) {
      next();
      return;
    }

    const roles = await user.getRoles();
    for (let role of roles) {
      if (role === "ADMIN" || "MODERATOR") {
        next();
        return;
      }
    }

    res.status(403).send("Not authorized");
  } catch (e) {
    res.status(500).send({ status: "error", message: e.message });
  }
};

const verifySignUpParameters = (req, res, next) => {
  if (
    req.body.username === null ||
    req.body.email === null ||
    req.body.password === null
  ) {
    res
      .status(404)
      .send({ status: "error", message: "Bad request parameters" });
  } else {
    next();
  }
};

const verifySignInParameters = (req, res, next) => {
  if (
    (req.body.username === null && req.body.email === null) ||
    req.body.password === null
  ) {
    res
      .status(404)
      .send({ status: "error", message: "Bad request parameters" });
  } else {
    next();
  }
};

export {
  verifyToken,
  isAdmin,
  isAdminOrModerator,
  isAdminOrModeratorOrOwner,
  verifySignUpParameters,
  verifySignInParameters,
};
