const express = require("express");
const router = express.Router();
const controller = require("../controllers/workflow.controller");

router.post("/", controller.create);
router.get("/:id", controller.getByCommande);

module.exports = router;
