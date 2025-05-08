
const express = require('express');
const router = express.Router();
const controller = require('../controllers/adresse.controller');

router.post('/geocode', controller.geocode);

module.exports = router;
