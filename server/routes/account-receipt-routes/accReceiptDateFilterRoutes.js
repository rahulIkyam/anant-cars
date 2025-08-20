const express = require('express');
const { getAccReceiptDateFilter } = require('../../controllers/account-receipt-controllers/accReceiptDateFilterController');
const router = express.Router();

router.get('/', getAccReceiptDateFilter);

module.exports = router;