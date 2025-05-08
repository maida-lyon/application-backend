const express = require("express");
const router = express.Router();
const controller = require("../controllers/tracking.controller");

// Mise à jour de la position d'un transporteur
router.post("/location", controller.updateLocation);

// Suivi public (client final)
router.get("/status/:id", controller.getStatus);

module.exports = router;
