const express = require("express");
const router = express.Router();
const commandeController = require("../controllers/commande.controller");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + file.fieldname + ext);
  },
});
const upload = multer({ storage });

router.post(
  "/",
  upload.fields([
    { name: "photoChargement", maxCount: 1 },
    { name: "photoLivraison", maxCount: 1 },
  ]),
  commandeController.creerCommande
);

router.get("/", commandeController.getAllCommandes);
router.get("/:id", commandeController.getCommandeById);

module.exports = router;
