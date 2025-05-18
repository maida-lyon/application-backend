require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./config/db");

const app = express();

// ✅ Ajout des domaines front autorisés pour CORS
const FRONTEND_URL = [
  "https://application-livraison-pwem.vercel.app",
  "https://application-livraison.vercel.app",
];

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Sécurité + JSON parser
app.use(helmet());
app.use(express.json());

// ✅ Connexion PostgreSQL
db.authenticate()
  .then(() => console.log("✅ Connexion PostgreSQL réussie"))
  .catch((error) => console.error("❌ Erreur PostgreSQL :", error));

// ✅ Routing principal : toutes les routes passent sous /api
app.use("/api", require("./routes/index"));

// ❌ Gestion des routes inconnues (404)
app.use((req, res) => {
  res.status(404).json({ message: "❌ API introuvable" });
});

// ✅ Port Railway ou local
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend actif sur le port ${PORT}`);
});
