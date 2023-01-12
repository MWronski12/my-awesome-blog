import { db } from "../models/index.js";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
  try {
    // Generate password hash
    var salt = bcrypt.genSaltSync(Number.parseInt(process.env.SALT_ROUNDS));
    var hash = bcrypt.hashSync(req.body.password, salt);

    // Insert user into DB
    const user = await db.User.create({
      ...req.body,
      password: hash,
    });

    // Grant USER Role
    const userRole = await db.Role.findOne({ where: { name: "USER" } });
    await user.addRole(userRole);

    res.status(201).send({
      message: "User successfully registered",
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const signIn = async (req, res) => {
  try {
    // Fetch user from DB by username or email
    const where = req.body.username
      ? { username: req.body.username }
      : { email: req.body.email };
    const user = await db.User.findOne({ where, include: db.Role });

    // User not found in DB
    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check password hash
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(403).send({ message: "Bad credentials" });
    }

    // Generate JWT token with user data
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXP_TIME,
    });

    res.status(200).send({
      message: "User successfully signed in",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles.map((role) => role.name),
      },
      token,
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const grantRole = async (req, res) => {
  try {
    // Fetch user and role, set role
    const user = await db.User.findByPk(req.body.userId);
    const role = await db.Role.findByPk(req.body.roleId);

    // Check if they exist in database
    if (user === null || role === null) {
      return res
        .status(404)
        .send({ status: "error", message: "Bad request parameters" });
    }

    res.status(200).send({
      status: "success",
      message: `${role.name} role granted to ${user.username}`,
    });
  } catch (e) {
    res.status(500).send({ status: "error", message: e.message });
  }
};

export { signUp, signIn, grantRole };
