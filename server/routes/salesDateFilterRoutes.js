const express = require('express');
const { getSalesDateFilter } = require('../controllers/salesDateFilterController');
const router = express.Router();

router.get('/', getSalesDateFilter);

module.exports = router;