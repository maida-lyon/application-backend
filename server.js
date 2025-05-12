require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./config/db");
const app = express();

// === Middlewares ===
app.use(
  cors({
    origin: "*", // autorise toutes les origines (ex: ngrok)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(helmet());

// === Vérifie la connexion à PostgreSQL ===
db.authenticate()
  .then(() => console.log("✅ Connexion à PostgreSQL réussie."))
  .catch((error) => console.error("❌ Erreur connexion PostgreSQL :", error));

// === Toutes les routes ===
app.use("/api", require("./routes/index"));

// === Erreur 404 si aucune route ne correspond ===
app.use((req, res) => {
  res.status(404).json({ message: "❌ API introuvable." });
});

// === Lancement du serveur ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend actif sur le port ${PORT}`);
});
