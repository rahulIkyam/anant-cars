const express = require('express');
const { getSalesCountRecords } = require('../controllers/salesCountRecordsControllers');
const router = express.Router();

router.get('/', getSalesCountRecords);

module.exports = router;