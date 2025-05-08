const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

// Récupération des comptes à valider (transporteurs et donneurs non validés)
router.get("/comptes", adminController.getComptes);

// Validation manuelle (par l'admin)
router.put("/valider/:id", adminController.validateUser);

// Refus d’un utilisateur (supprime ou désactive)
router.put("/refuser/:id", adminController.refuseUser);

// Force la validation même si des documents manquent
router.put("/forcer/:id", adminController.forceValidation);

module.exports = router;
