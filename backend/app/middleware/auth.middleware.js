import jwt from "jsonwebtoken";
import { db } from "../models/index.js";

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers["x-access-token"];

    // No token provided
    if (!token) {
      return res.status(403).send({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      // Verification error
      if (err) {
        return res.status(401).send({
          message: err.message,
        });
      }

      // Verification success
      req.userId = decoded.userId;
      next();
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.userId);
    // User doesn't exist
    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check if ADMIN role is present
    const roles = await user.getRoles();
    for (let role of roles) {
      if (role.name === "ADMIN") {
        req.userRole = "ADMIN";
        return next();
      }
    }

    res.status(403).send({ message: "Not authorized" });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const isAdminOrModerator = async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.userId);
    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }

    const roles = await user.getRoles();
    for (let role of roles) {
      if (role.name === "MODERATOR" || role.name === "ADMIN") {
        req.userRole = role.name;
        next();
        return;
      }
    }

    res.status(403).send({ message: "Not authorized" });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export { verifyToken, isAdmin, isAdminOrModerator };
