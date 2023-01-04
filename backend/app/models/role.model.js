import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Role = sequelize.define("role", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return Role;
};
