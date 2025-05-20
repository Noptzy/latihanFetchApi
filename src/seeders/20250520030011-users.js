"use strict";
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("users", [
      {
        name: "tegar",
        email: "tegar@gmail.com",
        password: await bcrypt.hash("tegar123", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "nida",
        email: "nida@gmail.com",
        password: await bcrypt.hash("nida123", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "rochyat",
        email: "rochyat@gmail.com",
        password: await bcrypt.hash("rochyat123", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  },
};
