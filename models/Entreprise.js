const { DataTypes } = require("sequelize");
const db = require("../config/db"); // ✅ Bon chemin

const Entreprise = db.define("Entreprise", {
  nom: DataTypes.STRING,
  siret: DataTypes.STRING,
  adresse: DataTypes.STRING,
});

module.exports = Entreprise;
