"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hash = await bcrypt.hash("Motdepasse123", 10);

    return queryInterface.bulkInsert("Users", [
      {
        nom: "Admin Principal",
        email: "boucelouaoussama69@gmail.com",
        telephone: "0658407152",
        motdepasse: hash,
        role: "admin",
        documents: JSON.stringify({}), // vide pour l'instant
        valide: true,
        force: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", {
      email: "boucelouaoussama69@gmail.com",
    });
  },
};
