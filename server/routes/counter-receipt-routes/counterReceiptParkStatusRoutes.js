const express = require('express');
const { getCounterReceiptParkStatus } = require('../../controllers/counter-receipt-controllers/counterReceiptParkStatusController');
const router = express.Router();

router.get('/', getCounterReceiptParkStatus);

module.exports = router;