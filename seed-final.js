const db = require("./config/db");
const { DataTypes } = require("sequelize");

// Importer ou redéfinir les modèles si besoin
const User = require("./models/User");
const Entreprise = require("./models/Entreprise");
const Document = require("./models/Document");
const Vehicule = require("./models/Vehicule");
const Commande = require("./models/Commande");
const Matching = require("./models/Matching");

// Relations
User.belongsTo(Entreprise);
User.hasMany(Document);
User.hasMany(Commande);
User.hasMany(Vehicule);

Entreprise.hasMany(User);
Entreprise.hasMany(Document);

Commande.belongsTo(User);
Commande.belongsTo(Vehicule);
Commande.hasMany(Document);

Matching.belongsTo(Commande);
Matching.belongsTo(User);
Matching.belongsTo(Vehicule);

// Seeder principal
(async () => {
  try {
    await db.authenticate();
    console.log("Connexion PostgreSQL OK");

    const admin = await User.create({
      nom: "Admin Général",
      email: "admin@livraison.fr",
      telephone: "0600000000",
      adresse: "Lyon",
      role: "admin",
      statutEnLigne: true,
    });

    const donneur = await User.create({
      nom: "Donneur Alpha",
      email: "donneur@alpha.fr",
      telephone: "0610101010",
      adresse: "Villeurbanne",
      role: "donneur",
      statutEnLigne: true,
    });

    const transporteur = await User.create({
      nom: "Trans Momo",
      email: "momo@transport.fr",
      telephone: "0620202020",
      adresse: "Vaulx-en-Velin",
      role: "transporteur",
      statutEnLigne: true,
    });

    const manutentionnaire = await User.create({
      nom: "Ali Manut",
      email: "ali@manut.fr",
      telephone: "0630303030",
      adresse: "Bron",
      role: "manutentionnaire",
      statutEnLigne: true,
    });

    const entreprise = await Entreprise.create({
      nom: "AlphaLogistics",
      siret: "12345678901234",
      adresse: "10 rue des Hubs, Lyon",
    });

    await donneur.setEntreprise(entreprise);
    await transporteur.setEntreprise(entreprise);

    await Document.bulkCreate([
      {
        type: "RC Pro",
        url: "https://docs/rcpro.pdf",
        UserId: transporteur.id,
      },
      { type: "KBIS", url: "https://docs/kbis.pdf", UserId: transporteur.id },
      {
        type: "Assurance",
        url: "https://docs/assurance.pdf",
        UserId: transporteur.id,
      },
    ]);

    const vehicule = await Vehicule.create({
      marque: "Renault",
      modele: "Master",
      immatriculation: "AB-456-CD",
      type: "Fourgon",
      UserId: transporteur.id,
    });

    const commande = await Commande.create({
      type: "freight",
      adresseDepart: "20 avenue du Port, Lyon",
      adresseArrivee: "150 rue du Centre, Villeurbanne",
      poids: 1200,
      volume: 8,
      statut: "en attente",
      UserId: donneur.id,
      VehiculeId: vehicule.id,
    });

    await Matching.create({
      type: "freight",
      prix: 220,
      statut: "proposé",
      CommandeId: commande.id,
      UserId: transporteur.id,
      VehiculeId: vehicule.id,
    });

    console.log("Seed terminé avec succès !");
    process.exit();
  } catch (error) {
    console.error("Erreur pendant le seed :", error);
    process.exit(1);
  }
})();
