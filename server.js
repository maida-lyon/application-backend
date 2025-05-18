require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./config/db");

const app = express();

// 🔐 Met ici exactement ton vrai domaine Vercel (frontend)
const FRONTEND_URL = "https://application-livraison-pwem.vercel.app";

// ✅ Middleware CORS avec l'URL autorisée
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Sécurité + JSON
app.use(helmet());
app.use(express.json());

// ✅ Connexion DB
db.authenticate()
  .then(() => console.log("✅ Connexion PostgreSQL réussie"))
  .catch((error) => console.error("❌ Erreur PostgreSQL :", error));

// ✅ Routes (commence bien par /api)
app.use("/api", require("./routes/index"));

// ✅ Gestion 404
app.use((req, res) => {
  res.status(404).json({ message: "❌ API introuvable" });
});

// ✅ Port Railway
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend actif sur le port ${PORT}`);
});
