require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./config/db");

const app = express();

// ✅ CORS bien configuré (autorise toutes les origines)
app.use(
  cors({
    origin: "*", // ou mets "https://xxx.ngrok-free.app" ici si tu veux restreindre
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(helmet());

// Connexion à PostgreSQL
db.authenticate()
  .then(() => console.log("✅ Connexion à PostgreSQL réussie."))
  .catch((error) => console.error("❌ Erreur connexion PostgreSQL :", error));

// Toutes les routes
app.use("/api", require("./routes/index"));

// 404
app.use((req, res) => {
  res.status(404).json({ message: "❌ API introuvable." });
});

// Lancement serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend actif sur le port ${PORT}`);
});
