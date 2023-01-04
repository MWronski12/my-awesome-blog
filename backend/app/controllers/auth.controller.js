import { User } from "../models/index.js";
import { hash } from "../common/bcrypt.js";

const signUp = async (req, res) => {
  try {
    const passwordHash = await hash(req.body.password);
    console.log(passwordHash);

    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: passwordHash,
    });

    res.status(201).send({ user });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const login = async (req, res) => {
  try {
    const passwordHash = await hash(req.body.password);

    const user = await User.findOne({
      where: {
        username: req.body.username,
        password: passwordHash,
      },
    });

    if (user === null) {
      res.status(404).send();
    }

    const token = genNewToken({ username: user.username });
    res.status(200).send({ token });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const genNewToken = (data) => {
  return jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP_TIME,
  });
};

export { signUp, login };
