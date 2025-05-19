require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./config/db");

const app = express();

// 🟢 Ton vrai domaine frontend Vercel
const FRONTEND_URL = "https://application-livraison-pwem.vercel.app";

// ✅ Middleware CORS complet
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

// ✅ Obligatoire pour autoriser OPTIONS (préflight)
app.options("*", cors());

app.use(helmet());
app.use(express.json());

db.authenticate()
  .then(() => console.log("✅ Connexion PostgreSQL réussie"))
  .catch((error) => console.error("❌ Erreur PostgreSQL :", error));

// ✅ Toutes tes routes sont sous "/api"
app.use("/api", require("./routes/index"));

app.use((req, res) => {
  res.status(404).json({ message: "❌ API introuvable" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend actif sur le port ${PORT}`);
});
