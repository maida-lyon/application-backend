const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const upload = require("../middleware/upload");

console.log("user.routes.js chargé");

// === Authentification ===
router.post(
  "/register",
  upload.fields([
    { name: "kbis", maxCount: 1 },
    { name: "assurance", maxCount: 1 },
    { name: "identite", maxCount: 1 },
    { name: "rib", maxCount: 1 },
    { name: "justificatif", maxCount: 1 },
  ]),
  userController.registerUser
);

router.post("/login", userController.loginUser);
router.get("/profile", userController.getProfile);
router.get("/logout", userController.logoutUser);

router.get("/test", (req, res) => {
  res.send("Route /api/users/test OK");
});

// Route de test pour confirmer l’accès à /api/users/
router.get("/", (req, res) => {
  res.json({ message: "✅ Route /api/users/ accessible depuis Railway" });
});

module.exports = router;
