const { Sequelize } = require("sequelize");
require("dotenv").config();

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres", // 🔥 OBLIGATOIRE
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = db;
