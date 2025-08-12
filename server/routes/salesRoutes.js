const express = require('express');
const { getSales } = require('../controllers/salesController');
const router = express.Router();


router.get('/', getSales);

module.exports = router;