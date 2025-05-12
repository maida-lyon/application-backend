require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./config/db");

const app = express();

// ✅ CORS public pour Railway + Ngrok
app.use(
  cors({
    origin: "*", // ou remplace par "https://ton-lien-ngrok.ngrok-free.app"
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Middlewares globaux
app.use(express.json());
app.use(helmet());

// ✅ Test DB PostgreSQL
db.authenticate()
  .then(() => console.log("✅ Connexion à PostgreSQL réussie."))
  .catch((error) => console.error("❌ Erreur connexion PostgreSQL :", error));

// ✅ Groupement des routes
app.use("/api", require("./routes/index"));

// ✅ 404 si aucune route ne matche
app.use((req, res) => {
  res.status(404).json({ message: "❌ API introuvable." });
});

// ✅ Lancement serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend actif sur le port ${PORT}`);
});
