import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Comment = sequelize.define("comment", {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
  });

  return Comment;
};
