require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./config/db");

const app = express();

// ✅ Autoriser le front Vercel
const FRONTEND_URL = "https://application-livraison-pwem.vercel.app";

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// 🔐 Sécurité et JSON
app.use(helmet());
app.use(express.json());

// ✅ Connexion DB PostgreSQL Railway
db.authenticate()
  .then(() => console.log("✅ Connexion PostgreSQL Railway réussie"))
  .catch((error) => console.error("❌ Erreur PostgreSQL :", error));

// ✅ Toutes tes routes API
app.use("/api", require("./routes/index"));

// ❌ 404 par défaut
app.use((req, res) => {
  res.status(404).json({ message: "❌ API introuvable" });
});

// ✅ Port Railway
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend actif sur le port ${PORT}`);
});
