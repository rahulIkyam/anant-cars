const express = require('express');
const { getSalesParkStatus } = require('../controllers/salesParkStatusController');
const router = express.Router();

router.get('/', getSalesParkStatus);

module.exports = router;