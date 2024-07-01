"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Borrow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Borrow.belongsTo(models.Member, { foreignKey: "MemberId" });
      Borrow.belongsTo(models.Book, { foreignKey: "BookId" });
    }
  }
  Borrow.init(
    {
      MemberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "MemberId is required" },
          notEmpty: { msg: "MemberId is required" },
        },
        references: {
          model: "Member",
          key: "id",
        },
      },
      BookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "BookId is required" },
          notEmpty: { msg: "BookId is required" },
        },
        references: {
          model: "Book",
          key: "id",
        },
      },
      returnDate: DataTypes.DATE,
      penaltyEnd: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Borrow",
    }
  );
  return Borrow;
};
