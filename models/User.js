const { DataTypes } = require("sequelize");
const db = require("../config/db");

const User = db.define("User", {
  nom: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  telephone: DataTypes.STRING,
  motdepasse: DataTypes.STRING,
  role: {
    type: DataTypes.ENUM("admin", "donneur", "transporteur"),
    defaultValue: "donneur",
  },
  valide: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  forcer: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  documents: {
    type: DataTypes.JSONB,
    defaultValue: {},
  },
});

module.exports = User;
