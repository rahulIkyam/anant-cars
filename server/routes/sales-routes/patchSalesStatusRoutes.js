const express = require("express");
const { patchSalesStatusController } = require("../../controllers/sales-controllers/patchSalesStatusController");
const router = express.Router();


router.patch('/update-status', patchSalesStatusController);

module.exports = router;