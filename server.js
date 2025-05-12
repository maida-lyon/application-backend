require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./config/db");

const app = express();

// ✅ CORS correctement configuré pour Railway + Ngrok
const corsOptions = {
  origin: "*", // ou remplace par ton vrai lien ngrok si tu veux restreindre
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
app.use(helmet());

// Test DB
db.authenticate()
  .then(() => console.log("✅ Connexion à PostgreSQL réussie."))
  .catch((error) => console.error("❌ Erreur connexion PostgreSQL :", error));

// Routes
app.use("/api", require("./routes/index"));

// 404
app.use((req, res) => {
  res.status(404).json({ message: "❌ API introuvable." });
});

// Lancement du serveur
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend actif sur le port ${PORT}`);
});
