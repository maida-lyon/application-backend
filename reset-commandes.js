const db = require("./config/db");
const Commande = require("./models/Commande");

(async () => {
  try {
    await db.authenticate();
    console.log("✅ Connexion DB OK");

    await Commande.destroy({ where: {} });
    console.log("✅ Toutes les commandes ont été supprimées");

    process.exit();
  } catch (err) {
    console.error("❌ Erreur reset :", err);
    process.exit(1);
  }
})();
