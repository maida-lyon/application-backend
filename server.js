const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./config/db");

const app = express();

// ✅ Autoriser tous les domaines Vercel utilisés
const FRONTEND_URL = [
  "https://application-livraison-pwem.vercel.app",
  "https://application-livraison-pwem-git-main-maida-lyons-projects.vercel.app",
  "https://application-livraison-pwem-ciocove8o-maida-lyons-projects.vercel.app",
];

// ✅ Middleware CORS configuré proprement
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// ✅ Important pour les requêtes de pré-vérification (OPTIONS)
app.options("*", cors());

app.use(helmet());
app.use(express.json());

// Connexion à PostgreSQL
db.authenticate()
  .then(() => console.log("✅ Connexion PostgreSQL réussie"))
  .catch((err) => console.error("❌ Erreur PostgreSQL :", err));

// Routes
app.use("/api", require("./routes/index")); // NE PAS TOUCHER

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend actif sur le port ${PORT}`);
});
