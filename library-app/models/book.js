"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsToMany(models.Member, {
        through: "Borrows",
        foreignKey: "BookId",
      });
    }
  }
  Book.init(
    {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Book Code is required" },
          notNull: { msg: "Book Code is required" },
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Book Title is required" },
          notNull: { msg: "Book Title is required" },
        },
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Book Author is required" },
          notNull: { msg: "Book Author is required" },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Book Stock is required" },
          notNull: { msg: "Book Stock is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
