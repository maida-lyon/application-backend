const express = require("express");
const router = express.Router();

// === ROUTES MÉTIERS ===
router.use("/users", require("./user.routes"));
router.use("/vehicules", require("./vehicule.routes"));
router.use("/commandes", require("./commande.routes"));
router.use("/matchings", require("./matching.routes"));
router.use("/documents", require("./document.routes"));
router.use("/entreprises", require("./entreprise.routes"));
router.use("/litiges", require("./litige.routes"));
router.use("/photos", require("./photo.routes"));
router.use("/paiements", require("./paiement.routes"));
router.use("/invoices", require("./invoice.routes"));
router.use("/adresses", require("./adresse.routes"));
router.use("/tracking", require("./tracking.routes"));

// === ROUTES SYSTÈME / IA / UPLOAD / CHATBOT ===
router.use("/uploads", require("./upload.routes"));
router.use("/chatbot", require("./chatbot.routes"));
router.use("/signatures", require("./signature.routes"));
router.use("/workflows", require("./workflow.routes"));
router.use("/notifications", require("./notification.routes"));
router.use("/ia", require("./ia.routes"));

// === ADMINISTRATION ===
router.use("/admin", require("./admin.routes"));

// === TEST API ===
router.get("/", (req, res) => {
  res.send("✅ API DeliverApp opérationnelle");
});

router.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

module.exports = router;
