require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./config/db");

const app = express();

// ✅ CORS précis pour Railway + ton Ngrok
const FRONTEND_URL =
  "https://c339-2a04-cc00-1071-b327-8c3b-ddb2-4167-8ace.ngrok-free.app";

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// 🔐 Sécurité + JSON parser
app.use(helmet());
app.use(express.json());

// ✅ Connexion DB
db.authenticate()
  .then(() => console.log("✅ Connexion PostgreSQL réussie"))
  .catch((error) => console.error("❌ Erreur PostgreSQL :", error));

// ✅ Routes groupées
app.use("/api", require("./routes/index"));

// ❌ Route 404 si rien n’est trouvé
app.use((req, res) => {
  res.status(404).json({ message: "❌ API introuvable" });
});

// ✅ Port Railway
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend actif sur le port ${PORT}`);
});
