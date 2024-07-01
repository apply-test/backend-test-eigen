"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const members = require("../data/member.json").map((member) => {
      member.createdAt = new Date();
      member.updatedAt = new Date();
      return member;
    });
    await queryInterface.bulkInsert("Members", members);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Members", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
