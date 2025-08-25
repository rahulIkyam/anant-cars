const express = require('express');
const { patchCounterReceiptStatusController } = require('../../controllers/counter-receipt-controllers/patchCounterReceiptStatusController');
const router = express.Router();

router.patch('/update-status', patchCounterReceiptStatusController);

module.exports = router;