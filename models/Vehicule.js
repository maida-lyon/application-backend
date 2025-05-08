const { DataTypes } = require("sequelize");
const db = require("../config/db"); // ✅ Bon chemin

const Vehicule = db.define("Vehicule", {
  type: { type: DataTypes.STRING, allowNull: false },
  longueur: DataTypes.FLOAT,
  largeur: DataTypes.FLOAT,
  hauteur: DataTypes.FLOAT,
  volumeMax: DataTypes.FLOAT,
  poidsMax: DataTypes.FLOAT,
  temperatureMin: DataTypes.STRING,
  options: DataTypes.ARRAY(DataTypes.STRING),
  UserId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Vehicule;
