const User = require("./User");
const Vehicule = require("./Vehicule");
const Commande = require("./Commande");
const Document = require("./Document");
const Matching = require("./Matching");
const Litige = require("./Litige");
const Photo = require("./Photo");
const Paiement = require("./Paiement");
const RIB = require("./RIB");
const Adresse = require("./Adresse");
const Signature = require("./Signature");
const Workflow = require("./Workflow");
const Notification = require("./Notification");

// === Associations principales ===

// User ↔ Vehicule
User.hasMany(Vehicule, { foreignKey: "UserId", onDelete: "CASCADE" });
Vehicule.belongsTo(User, { foreignKey: "UserId", onDelete: "CASCADE" });

// User ↔ Commande (Donneur d’ordre)
User.hasMany(Commande, { foreignKey: "UserId", onDelete: "SET NULL" });
Commande.belongsTo(User, { foreignKey: "UserId", onDelete: "SET NULL" });

// Commande ↔ Matching
Commande.hasOne(Matching, { foreignKey: "CommandeId", onDelete: "CASCADE" });
Matching.belongsTo(Commande, { foreignKey: "CommandeId" });

// User ↔ Matching (Transporteur retenu)
User.hasMany(Matching, { foreignKey: "UserId" });
Matching.belongsTo(User, { foreignKey: "UserId" });

// Commande ↔ Document
Commande.hasMany(Document, { foreignKey: "CommandeId" });
Document.belongsTo(Commande, { foreignKey: "CommandeId" });

// Commande ↔ Litige
Commande.hasMany(Litige, { foreignKey: "CommandeId" });
Litige.belongsTo(Commande, { foreignKey: "CommandeId" });

// Commande ↔ Photo
Commande.hasMany(Photo, { foreignKey: "CommandeId" });
Photo.belongsTo(Commande, { foreignKey: "CommandeId" });

// Commande ↔ Signature
Commande.hasMany(Signature, { foreignKey: "CommandeId" });
Signature.belongsTo(Commande, { foreignKey: "CommandeId" });

// Commande ↔ Adresse
Commande.hasOne(Adresse, { foreignKey: "CommandeId" });
Adresse.belongsTo(Commande, { foreignKey: "CommandeId" });

// Commande ↔ Workflow
Commande.hasOne(Workflow, { foreignKey: "CommandeId" });
Workflow.belongsTo(Commande, { foreignKey: "CommandeId" });

// Commande ↔ Paiement
Commande.hasOne(Paiement, { foreignKey: "CommandeId" });
Paiement.belongsTo(Commande, { foreignKey: "CommandeId" });

// User ↔ Notification
User.hasMany(Notification, { foreignKey: "UserId" });
Notification.belongsTo(User, { foreignKey: "UserId" });

// RIB ↔ User
User.hasOne(RIB, { foreignKey: "UserId" });
RIB.belongsTo(User, { foreignKey: "UserId" });

module.exports = {
  User,
  Vehicule,
  Commande,
  Document,
  Matching,
  Litige,
  Photo,
  Paiement,
  RIB,
  Adresse,
  Signature,
  Workflow,
  Notification,
};
