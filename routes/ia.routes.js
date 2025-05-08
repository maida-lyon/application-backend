const express = require("express");
const router = express.Router();
const iaDocumentCheck = require("../controllers/iaDocumentCheck");

// === ROUTE D'ANALYSE DOCUMENT IA ===
router.post("/verifier/:userId", iaDocumentCheck.verifierDocuments);

module.exports = router;
