require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./config/db");

const app = express();

// ✅ Met ici l’URL exacte de ton frontend sur Vercel
const FRONTEND_URL = "https://application-livraison-pwem.vercel.app";

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // pour que les cookies passent bien
  })
);

app.use(helmet());
app.use(express.json());

db.authenticate()
  .then(() => console.log("✅ Connexion PostgreSQL réussie"))
  .catch((error) => console.error("❌ Erreur PostgreSQL :", error));

// ✅ Toutes tes routes utilisent le préfixe /api
app.use("/api", require("./routes/index"));

// ❌ Catch-all si aucune route ne correspond
app.use((req, res) => {
  res.status(404).json({ message: "❌ API introuvable" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend actif sur le port ${PORT}`);
});
