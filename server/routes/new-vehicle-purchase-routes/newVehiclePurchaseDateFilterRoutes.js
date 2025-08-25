const express = require('express');
const { getNewVehiclePurchaseDateFilter } = require('../../controllers/new-vehicle-purchase-controllers/newVehiclePurchaseDateFilterController');
const router = express.Router();


router.get('/', getNewVehiclePurchaseDateFilter);

module.exports = router;