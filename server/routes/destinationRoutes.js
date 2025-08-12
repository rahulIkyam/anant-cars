const express = require('express');
const { getDestination } = require('../controllers/destinationController');
const router = express.Router();

router.get('/', getDestination);

module.exports = router;
