
const express = require('express');
const router = express.Router();
const controller = require('../controllers/paiement.controller');

router.post('/execute', controller.execute);

module.exports = router;
