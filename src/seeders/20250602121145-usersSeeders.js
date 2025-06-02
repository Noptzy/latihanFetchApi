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
        name: "jawir Ganteng 123",
        email: "jawir@gmail.com",
        password: await bcrypt.hash("jawajawa", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Joko Sudarsono",
        email: "joko@gmail.com",
        password: await bcrypt.hash("jokosudarsono123", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Anies Boa Edan",
        email: "anies@gmail.com",
        password: await bcrypt.hash("aniesPaslonNoSatu", 10),
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
