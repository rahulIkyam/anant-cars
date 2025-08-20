const express = require('express');
const { getSalesParkStatus } = require('../../controllers/sales-controllers/salesParkStatusController');
const router = express.Router();

router.get('/', getSalesParkStatus);

module.exports = router;