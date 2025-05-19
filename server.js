require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./config/db");

const app = express();

// ✅ METS ICI TON LIEN FRONTEND VERCEL
const FRONTEND_URL = "https://application-livraison-pwem.vercel.app";

// ✅ Configuration CORS PRODUCTION
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(helmet());
app.use(express.json());

// ✅ Connexion PostgreSQL
db.authenticate()
  .then(() => console.log("✅ Connexion PostgreSQL réussie"))
  .catch((error) => console.error("❌ Erreur PostgreSQL :", error));

// ✅ Point d’entrée des routes
app.use("/api", require("./routes/index"));

// ✅ Gestion 404
app.use((req, res) => {
  res.status(404).json({ message: "❌ API introuvable" });
});

// ✅ Lancement serveur
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend actif sur le port ${PORT}`);
});
