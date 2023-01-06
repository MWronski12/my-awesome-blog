import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Comment = sequelize.define("comment", {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
  });

  return Comment;
};
