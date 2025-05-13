// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./config/db");

const app = express();

// ✅ CORS sécurisé : autorise Railway + ton lien Ngrok uniquement
const allowedOrigins = [
  "https://application-backend.up.railway.app",
  "https://1e0a-2a01-e0a-290-4d70-99cf-3996-89a0-a262.ngrok-free.app", // ton Ngrok
  "http://localhost:3000", // pour tests locaux
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS non autorisé"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(helmet());

// ✅ Vérifie la connexion PostgreSQL
db.authenticate()
  .then(() => console.log("✅ Connexion à PostgreSQL réussie."))
  .catch((error) => console.error("❌ Erreur connexion PostgreSQL :", error));

// ✅ Routes regroupées
app.use("/api", require("./routes/index"));

// ✅ Gestion 404
app.use((req, res) => {
  res.status(404).json({ message: "❌ API introuvable." });
});

// ✅ Lancement serveur
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend actif sur le port ${PORT}`);
});
