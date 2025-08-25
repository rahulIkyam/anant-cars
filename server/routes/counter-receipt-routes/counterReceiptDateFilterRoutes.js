const express = require('express');
const { getCounterReceiptDateFilter } = require('../../controllers/counter-receipt-controllers/counterReceiptDateFilterController');
const router = express.Router();

router.get('/', getCounterReceiptDateFilter);

module.exports = router;