const express = require("express");
const router = express.Router();
const {
  getAll,
  searchMatching,
  matchDistribution,
} = require("../controllers/matching.controller");

// === ROUTES MATCHING ===
router.get("/", getAll); // Voir tous les matchings
router.post("/search", searchMatching); // Matching FREIGHT
router.post("/distribution", matchDistribution); // Matching DISTRIBUTION

module.exports = router;
