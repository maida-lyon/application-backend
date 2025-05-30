const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const upload = require("../middleware/upload");

console.log("user.routes.js chargé");

// Auth
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

// Tests
router.get("/test", (req, res) => {
  res.send("✅ /api/users/test OK");
});
router.get("/", (req, res) => {
  res.json({ message: "✅ /api/users/ est accessible" });
});

module.exports = router;
