const sequelize = require("./config/db");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion à la base réussie !");
  } catch (error) {
    console.error("❌ Erreur de connexion à la base :", error);
  }
})();
