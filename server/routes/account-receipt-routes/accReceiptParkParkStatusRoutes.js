const express = require('express');
const { getAccReceiptParkStatus } = require('../../controllers/account-receipt-controllers/accReceiptParkStatusController');
const router = express.Router();

router.get('/', getAccReceiptParkStatus);

module.exports = router;