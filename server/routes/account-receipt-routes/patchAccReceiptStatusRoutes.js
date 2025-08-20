const express = require('express');
const { patchAccReceiptStatusController } = require("../../controllers/account-receipt-controllers/patchAccReceiptStatusController");
const router = express.Router();

router.patch('/update-status', patchAccReceiptStatusController);

module.exports = router;