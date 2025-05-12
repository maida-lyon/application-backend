// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./config/db");
const app = express();

// Autoriser ton frontend Ngrok
app.use(
  cors({
    origin: "https://8b0d-80-239-186-180.ngrok-free.app", // change ce lien à chaque fois si Ngrok change
    credentials: true,
  })
);

app.use(express.json());
app.use(helmet());

// DB check
db.authenticate()
  .then(() => console.log("✅ Connexion à PostgreSQL réussie."))
  .catch((error) => console.error("❌ Erreur connexion PostgreSQL :", error));

// Routes
app.use("/api", require("./routes/index"));

// 404
app.use((req, res) => {
  res.status(404).json({ message: "❌ API introuvable." });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend actif sur le port ${PORT}`);
});
