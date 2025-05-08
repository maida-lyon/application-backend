const { DataTypes } = require("sequelize");
const db = require("../config/db"); // ✅ Bon chemin

const Notification = db.define("Notification", {
  userId: DataTypes.INTEGER,
  message: DataTypes.STRING,
  type: DataTypes.ENUM("email", "sms"),
  statut: DataTypes.ENUM("envoyée", "échouée"),
  date: DataTypes.DATE,
});

module.exports = Notification;
