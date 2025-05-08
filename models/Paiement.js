const { DataTypes } = require("sequelize");
const db = require("../config/db"); // ✅ Bon chemin

const Paiement = db.define("Paiement", {
  montant: DataTypes.FLOAT,
  commission: DataTypes.FLOAT,
  statut: DataTypes.ENUM("en attente", "effectué", "échoué"),
});

module.exports = Paiement;
