require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./config/db");
const app = express();

// Middlewares généraux
app.use(cors());
app.use(express.json());
app.use(helmet());

// Vérification connexion à la DB PostgreSQL
db.authenticate()
  .then(() => {
    console.log("✅ Connexion à PostgreSQL réussie.");
  })
  .catch((error) => {
    console.error("❌ Erreur connexion PostgreSQL :", error);
  });

// === ROUTES ===

// Utilisateurs
app.use("/api/users", require("./routes/user.routes"));

// Authentification
app.use("/api/auth", require("./routes/auth.routes"));

// Commandes
app.use("/api/commandes", require("./routes/commande.routes"));

// Uploads (preuves, documents, etc.)
app.use("/api/upload", require("./routes/upload.routes"));

// Paiement
app.use("/api/paiement", require("./routes/paiement.routes"));

// Tracking livraison
app.use("/api/tracking", require("./routes/tracking.routes"));

// Matching missions
app.use("/api/matching", require("./routes/matching.routes"));

// Notifications
app.use("/api/notifications", require("./routes/notification.routes"));

// Chatbot ou IA
app.use("/api/chatbot", require("./routes/ia.routes"));

// Litiges
app.use("/api/litiges", require("./routes/litige.routes"));

// Factures
app.use("/api/factures", require("./routes/invoice.routes"));

// Véhicules
app.use("/api/vehicules", require("./routes/vehicle.routes"));

// Signature électronique
app.use("/api/signature", require("./routes/signature.routes"));

// Workflow livraison
app.use("/api/workflow", require("./routes/workflow.routes"));

// === ERREUR 404 si route inconnue ===
app.use((req, res) => {
  res.status(404).json({ message: "❌ API introuvable." });
});

// === LANCEMENT SERVEUR Railway ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend actif sur le port ${PORT}`);
});
