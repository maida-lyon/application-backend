const { DataTypes } = require("sequelize");
const db = require("../config/db"); // ✅ Bon chemin

const Document = db.define("Document", {
  type: DataTypes.STRING,
  url: DataTypes.STRING,
  statut: DataTypes.ENUM("en attente", "validé", "refusé"),
  raisonRefus: DataTypes.STRING,
});

const User = require("./User");
const Commande = require("./Commande");
const Entreprise = require("./Entreprise");

Document.belongsTo(User, { foreignKey: "UserId" });
Document.belongsTo(Commande, { foreignKey: "CommandeId" });
Document.belongsTo(Entreprise, { foreignKey: "EntrepriseId" });

module.exports = Document;
