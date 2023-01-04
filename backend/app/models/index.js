import { Sequelize } from "sequelize";

import defineUser from "./user.model.js";
import defineRole from "./role.model.js";
import definePost from "./post.model.js";
import defineComment from "./comment.model.js";

// initialize Sequelize object
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_PATH,
});

// define models
const User = defineUser(sequelize);
const Role = defineRole(sequelize);
const Post = definePost(sequelize);
const Comment = defineComment(sequelize);

// User-Role many-to-many
User.belongsToMany(Role, { through: "UserRoles" });
Role.belongsToMany(User, { through: "UserRoles" });

// User-Post one-to-many
User.hasMany(Post);
Post.belongsTo(User);

// User-Comment one-to-many
User.hasMany(Comment);
Comment.belongsTo(User);

// Post-Comment one-to-many
Post.hasMany(Comment);
Comment.belongsTo(Post);

// migrate
await sequelize.sync({ force: true });

// Insert default ROLES
await Role.bulkCreate([
  { name: "ADMIN" },
  { name: "MODERATOR" },
  { name: "USER" },
]);

export { sequelize as db, User, Role, Post, Comment };
