"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Member.belongsToMany(models.Book, {
        through: "Borrows",
        foreignKey: "MemberId",
      });
    }
  }
  Member.init(
    {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Member Code is required" },
          notNull: { msg: "Member Code is required" },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Name is required" },
          notNull: { msg: "Name is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Member",
    }
  );
  return Member;
};
