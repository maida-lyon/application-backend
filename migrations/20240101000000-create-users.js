"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nom: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      telephone: {
        type: Sequelize.STRING,
      },
      motdepasse: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
      },
      documents: {
        type: Sequelize.JSON,
      },
      valide: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      force: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Users");
  },
};
