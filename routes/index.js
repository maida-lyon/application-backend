// backend/routes/index.js

const express = require("express");
const router = express.Router();

// === ROUTES MÉTIERS ===
router.use("/users", require("./user.routes.js"));
router.use("/vehicules", require("./vehicule.routes.js"));
router.use("/commandes", require("./commande.routes.js"));
router.use("/matchings", require("./matching.routes.js"));
router.use("/documents", require("./document.routes.js"));
router.use("/entreprises", require("./entreprise.routes.js"));
router.use("/litiges", require("./litige.routes.js"));
router.use("/photos", require("./photo.routes.js"));
router.use("/paiements", require("./paiement.routes.js"));
router.use("/invoices", require("./invoice.routes.js"));
router.use("/adresses", require("./adresse.routes.js"));
router.use("/tracking", require("./tracking.routes.js"));

// === ROUTES SYSTÈME / IA / UPLOAD / CHATBOT ===
router.use("/uploads", require("./upload.routes.js"));
router.use("/chatbot", require("./chatbot.routes.js"));
router.use("/signatures", require("./signature.routes.js"));
router.use("/workflows", require("./workflow.routes.js"));
router.use("/notifications", require("./notification.routes.js"));
router.use("/ia", require("./ia.routes.js"));

// === ADMINISTRATION ===
router.use("/admin", require("./admin.routes.js"));

// === TEST API ===
router.get("/", (req, res) => {
  res.send("✅ API DeliverApp opérationnelle");
});

router.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

module.exports = router;
