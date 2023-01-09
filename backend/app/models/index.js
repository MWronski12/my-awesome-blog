import { Sequelize } from "sequelize";
import bcrypt from "bcryptjs";

import defineUser from "./user.model.js";
import defineRole from "./role.model.js";
import definePost from "./post.model.js";
import defineComment from "./comment.model.js";

import { dbConfig } from "../config/db.config.js";

// set environment
const env = process.env.NODE_ENV || "development";
const config = dbConfig[env];

// initialize Sequelize database
const db = {};
db.sequelize = new Sequelize(config);
db.Sequelize = Sequelize;

// define models
db.User = defineUser(db.sequelize);
db.Role = defineRole(db.sequelize);
db.Post = definePost(db.sequelize);
db.Comment = defineComment(db.sequelize);

// User-Role many-to-many
db.Role.belongsToMany(db.User, { through: "userroles", timestamps: false });
db.User.belongsToMany(db.Role, { through: "userroles", timestamps: false });

// User-Post one-to-many
db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

// User-Comment one-to-many
db.User.hasMany(db.Comment);
db.Comment.belongsTo(db.User);

// Post-Comment one-to-many
db.Post.hasMany(db.Comment);
db.Comment.belongsTo(db.Post);

// migrate
await db.sequelize.sync({ force: true });

// Insert default ROLES
await db.Role.bulkCreate([
  { name: "ADMIN" },
  { name: "MODERATOR" },
  { name: "USER" },
]);

// Create default accounts
const salt = bcrypt.genSaltSync(Number.parseInt(process.env.SALT_ROUNDS));
let hash = bcrypt.hashSync("admin", salt);
let user = await db.User.create({
  username: "admin",
  email: "admin",
  password: hash,
});
const adminRole = await db.Role.findOne({ where: { name: "ADMIN" } });
await user.addRole(adminRole);

hash = bcrypt.hashSync("moderator", salt);
user = await db.User.create({
  username: "moderator",
  email: "moderator",
  password: hash,
});
const moderatorRole = await db.Role.findOne({ where: { name: "MODERATOR" } });
await user.addRole(moderatorRole);

hash = bcrypt.hashSync("user", salt);
user = await db.User.create({
  username: "user",
  email: "user",
  password: hash,
});
const userRole = await db.Role.findOne({ where: { name: "USER" } });
await user.addRole(userRole);

export { db };
