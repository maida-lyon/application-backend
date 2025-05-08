const { DataTypes } = require("sequelize");
const db = require("../config/db"); // ✅ Bon chemin

const Signature = db.define("Signature", {
  nomSignataire: DataTypes.STRING,
  role: DataTypes.ENUM("chargement", "livraison"),
  image: DataTypes.STRING, // base64 ou url
  date: DataTypes.DATE,
});

module.exports = Signature;
