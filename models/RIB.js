const { DataTypes } = require("sequelize");
const db = require("../config/db"); // ✅ Bon chemin

const RIB = db.define("RIB", {
  iban: DataTypes.STRING,
  titulaire: DataTypes.STRING,
  banque: DataTypes.STRING,
  valide: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = RIB;
