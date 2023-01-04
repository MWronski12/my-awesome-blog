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

    res.status(201).send({
      status: "success",
      data: { username: user.username, email: user.email },
    });
  } catch (e) {
    res.status(500).send({ status: "error", message: e.message });
  }
};

const signIn = async (req, res) => {
  try {
    // Fetch user from DB
    const user = await db.User.findOne({
      where: {
        [Op.or]: [{ username: req.body.username }, { email: req.body.email }],
      },
    });

    // User not found in DB
    if (user === null) {
      res.status(404).send({ status: "error", message: "User not found" });
      return;
    }

    // Check password hash
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      res.status(403).send({ status: "error", message: "Bad credentials" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXP_TIME,
    });

    res.status(200).send({ status: "success", data: token });
  } catch (e) {
    res.status(500).send({ status: "error", message: e.message });
  }
};

export { signUp, signIn };
