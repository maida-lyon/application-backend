require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./config/db");

const app = express();

// ✅ CORS intelligent : localhost, Railway, Ngrok
const allowedOrigins = [
  "http://localhost:3000",
  "https://application-backend.up.railway.app",
  "https://309c-2a01-e0a-290-4d70-99cf-3996-89a0-a262.ngrok-free.app", // remplace ce lien si ton Ngrok change
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(helmet());

// ✅ Test connexion à la DB
db.authenticate()
  .then(() => console.log("✅ Connexion à PostgreSQL réussie."))
  .catch((error) => console.error("❌ Erreur connexion PostgreSQL :", error));

// ✅ Toutes les routes de l'app
app.use("/api", require("./routes/index"));

// ✅ Gestion 404
app.use((req, res) => {
  res.status(404).json({ message: "❌ API introuvable." });
});

// ✅ Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend actif sur le port ${PORT}`);
});
