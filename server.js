const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./config/db");

const app = express();

// CORS CONFIG
const FRONTEND_URL = "https://application-livraison-pwem.vercel.app";

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

// OPTIONS pour toutes les routes (très important)
app.options("*", cors());

app.use(helmet());
app.use(express.json());

db.authenticate()
  .then(() => console.log("✅ Connexion PostgreSQL réussie"))
  .catch((err) => console.error("❌ Erreur PostgreSQL :", err));

app.use("/api", require("./routes/index"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend actif sur le port ${PORT}`);
});
