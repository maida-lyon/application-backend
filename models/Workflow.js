const { DataTypes } = require("sequelize");
const db = require("../config/db"); // ✅ Bon chemin

const Workflow = db.define("Workflow", {
  commandeId: DataTypes.INTEGER,
  etape: DataTypes.ENUM(
    "assignée",
    "chargement",
    "livraison",
    "litige",
    "terminée",
    "refusée"
  ),
  date: DataTypes.DATE,
  commentaire: DataTypes.TEXT,
});

module.exports = Workflow;
