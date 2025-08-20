const express = require('express');
const { getSalesCountRecords } = require('../../controllers/sales-controllers/salesCountRecordsControllers');
const router = express.Router();

router.get('/', getSalesCountRecords);

module.exports = router;