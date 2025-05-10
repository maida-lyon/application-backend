const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// ✅ Route de connexion (login)
router.post("/login", userController.loginUser);

// ✅ Route de test (authentifié)
router.get("/test", (req, res) => {
  res.json({ message: "✅ Auth route fonctionne !" });
});

module.exports = router;
