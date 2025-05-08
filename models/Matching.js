const { DataTypes } = require("sequelize");
const db = require("../config/db"); // ✅ Bon chemin

const Matching = db.define("Matching", {
  type: DataTypes.STRING,
  prix: DataTypes.FLOAT,
  statut: DataTypes.STRING,
  commission: DataTypes.FLOAT,
  prixNet: DataTypes.FLOAT,
});

module.exports = Matching;
