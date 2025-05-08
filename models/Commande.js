const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Commande = db.define("Commande", {
  type: {
    type: DataTypes.ENUM("freight", "distribution"),
    allowNull: false,
  },

  // Chargement
  entrepriseChargement: DataTypes.STRING,
  telephoneChargement: DataTypes.STRING,
  adresseChargement: { type: DataTypes.STRING, allowNull: false },
  codePostalChargement: DataTypes.STRING,
  villeChargement: DataTypes.STRING,
  dateChargement: DataTypes.STRING,
  horaireChargement: DataTypes.STRING,
  instructionsChargement: DataTypes.STRING,

  // Livraison
  entrepriseLivraison: DataTypes.STRING,
  telephoneLivraison: DataTypes.STRING,
  adresseLivraison: { type: DataTypes.STRING, allowNull: false },
  codePostalLivraison: DataTypes.STRING,
  villeLivraison: DataTypes.STRING,
  dateLivraison: DataTypes.STRING,
  horaireLivraison: DataTypes.STRING,
  instructionsLivraison: DataTypes.STRING,

  // Marchandise
  typologie: DataTypes.STRING,
  quantiteColis: { type: DataTypes.INTEGER, allowNull: false },
  poids: DataTypes.FLOAT,
  longueur: DataTypes.FLOAT,
  largeur: DataTypes.FLOAT,
  hauteur: DataTypes.FLOAT,
  volume: DataTypes.FLOAT,
  metrageSol: DataTypes.FLOAT,
  temperatureMin: DataTypes.FLOAT,

  // Tarifs
  prixTotal: DataTypes.FLOAT,
  commission: DataTypes.FLOAT,
  netTransporteur: DataTypes.FLOAT,

  // Signatures et Preuves
  signatureChargement: DataTypes.TEXT, // image base64
  signatureLivraison: DataTypes.TEXT,
  nomSignataireChargement: DataTypes.STRING,
  nomSignataireLivraison: DataTypes.STRING,
  photoChargement: DataTypes.STRING, // nom fichier
  photoLivraison: DataTypes.STRING,

  // Lien vers utilisateur
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  // Statut de la commande
  statut: {
    type: DataTypes.STRING,
    defaultValue: "préparée",
  },
});

module.exports = Commande;
