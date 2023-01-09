import { db } from "../models/index.js";

const getUser = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.userId, { include: db.Role });

    // Check user roles
    let isAdminOrModerator = false;
    for (let role of user.roles) {
      if (role.name === "ADMIN" || role.name === "MODERATOR") {
        isAdminOrModerator = true;
      }
    }

    // User must be owner of the profile, admin or moderator
    if (req.params.id != req.userId && !isAdminOrModerator) {
      return res
        .status(403)
        .send({ status: "error", message: "Not authorized" });
    }

    res.status(200).send({
      status: "success",
      data: { username: user.username, email: user.email, roles: user.roles },
    });
  } catch (e) {
    res.status(500).send({ status: "error", message: e.message });
  }
};

export { getUser };
