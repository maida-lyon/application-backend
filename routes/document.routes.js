
const express = require('express');
const router = express.Router();
const controller = require('../controllers/document.controller');

router.post('/upload', controller.upload);

router.get('/', controller.getAll);
router.post('/', controller.create);

module.exports = router;