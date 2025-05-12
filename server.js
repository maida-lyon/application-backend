require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./config/db");

const app = express();

// ✅ CORS pour accès public (Ngrok + Railway)
app.use(
  cors({
    origin: "*", // ou mets ton vrai lien ngrok ici pour plus de sécurité
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middlewares globaux
app.use(express.json());
app.use(helmet());

// ✅ Connexion DB PostgreSQL
db.authenticate()
  .then(() => console.log("✅ Connexion à PostgreSQL réussie."))
  .catch((error) => console.error("❌ Erreur connexion PostgreSQL :", error));

// ✅ Groupement des routes
app.use("/api", require("./routes/index"));

// ✅ Gestion 404
app.use((req, res) => {
  res.status(404).json({ message: "❌ API introuvable." });
});

// ✅ Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend actif sur le port ${PORT}`);
});
