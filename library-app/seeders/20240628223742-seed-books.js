"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const books = require("../data/book.json").map((book) => {
      book.createdAt = new Date();
      book.updatedAt = new Date();
      return book;
    });
    await queryInterface.bulkInsert("Books", books, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Books", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
