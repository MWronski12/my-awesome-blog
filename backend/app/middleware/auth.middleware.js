import jwt from "jsonwebtoken";
import { db } from "../models/index.js";

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers["x-access-token"];

    // No token provided
    if (!token) {
      return res
        .status(403)
        .send({ status: "error", message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      // Verification error
      if (err) {
        return res.status(401).send({
          status: "error",
          message: err.message,
        });
      }

      // Verification success
      req.userId = decoded.userId;
      next();
    });
  } catch (e) {
    res.status(500).send({ status: "error", message: e.message });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.userId);
    const roles = await user.getRoles();
    for (let role of roles) {
      if (role.name === "ADMIN") {
        return next();
      }
    }
    res.status(403).send({ status: "error", message: "Not authorized" });
  } catch (e) {
    res.status(500).send({ status: "error", message: e.message });
  }
};

const isAdminOrModerator = async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.userId);
    const roles = await user.getRoles();
    for (let role of roles) {
      if (role.name === "MODERATOR" || role.name === "ADMIN") {
        next();
        return;
      }
    }
    res.status(403).send({ status: "error", message: "Not authorized" });
  } catch (e) {
    res.status(500).send({ status: "error", message: e.message });
  }
};

const verifySignUpParameters = (req, res, next) => {
  if (
    req.body.username === undefined ||
    req.body.email === undefined ||
    req.body.password === undefined
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
  verifyToken,
  isAdmin,
  isAdminOrModerator,
  verifySignUpParameters,
  verifySignInParameters,
  verifyGrantRoleParameters,
};
