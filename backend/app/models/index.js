import { Sequelize } from "sequelize";
import defineUser from "./user.model.js";

// initialize Sequelize object
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_PATH,
});

// define models
const User = defineUser(sequelize, Sequelize);

// define relations

// migrate
sequelize.sync({ force: true });

export { sequelize as db, User };
