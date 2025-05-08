const bcrypt = require("bcrypt");
const User = require("./models/User");
const db = require("./config/db");

(async () => {
  try {
    await db.authenticate();
    console.log("✅ Connexion DB OK");

    // Supprimer les anciens comptes pour test
    await User.destroy({ where: {} });

    // Recréer des comptes test
    const utilisateurs = [
      {
        nom: "Donneur Alpha",
        email: "donneur@alpha.fr",
        telephone: "0600000001",
        motdepasse: await bcrypt.hash("azerty123", 10),
        role: "donneur",
      },
      {
        nom: "Transporteur Momo",
        email: "momo@transport.fr",
        telephone: "0600000002",
        motdepasse: await bcrypt.hash("azerty123", 10),
        role: "transporteur",
      },
      {
        nom: "Admin DeliverApp",
        email: "admin@deliverapp.fr",
        telephone: "0600000003",
        motdepasse: await bcrypt.hash("azerty123", 10),
        role: "admin",
      },
    ];

    await User.bulkCreate(utilisateurs);
    console.log("✅ Utilisateurs créés avec succès");
    process.exit();
  } catch (err) {
    console.error("❌ Erreur seed :", err);
    process.exit(1);
  }
})();
