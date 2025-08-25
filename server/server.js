const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors({
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
}));
app.use(express.json());

const PORT = process.env.PORT;

const salesRoutes = require('./routes/sales-routes/salesRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const authRoutes = require('./routes/authRoutes');
const salesDateFilterRoutes = require('./routes/sales-routes/salesDateFilterRoutes');
const salesRecordCountRoutes = require('./routes/sales-routes/salesCountRecordsRoutes');
const salesParkStatusRoutes = require('./routes/sales-routes/salesParkStatusRoutes');
const patchSalesStatusRoutes = require('./routes/sales-routes/patchSalesStatusRoutes');

const accReceiptDateFilterRoutes = require('./routes/account-receipt-routes/accReceiptDateFilterRoutes');
const accReceiptParkStatusRoutes = require('./routes/account-receipt-routes/accReceiptParkParkStatusRoutes');
const patchAccReceiptStatusRoutes = require('./routes/account-receipt-routes/patchAccReceiptStatusRoutes');

const counterReceiptDateFilterRoutes = require('./routes/counter-receipt-routes/counterReceiptDateFilterRoutes');
const counterReceiptParkStatusRoutes = require('./routes/counter-receipt-routes/counterReceiptParkStatusRoutes');
const patchCounterReceiptstatusRoutes = require('./routes/counter-receipt-routes/patchCounterReceiptStatusRoutes');

const newVehiclePurchaseDateFilterRoutes = require('./routes/new-vehicle-purchase-routes/newVehiclePurchaseDateFilterRoutes');

app.use('/api/sales', salesRoutes);
app.use('/api/destination', destinationRoutes);
app.use('/api/login', authRoutes);
app.use('/api/salesDateFilter', salesDateFilterRoutes);
app.use('/api/salesRecordCount', salesRecordCountRoutes);
app.use('/api/salesParkStatus', salesParkStatusRoutes);
app.use('/api/updateStatus', patchSalesStatusRoutes);

app.use('/api/accReceiptDateFilter', accReceiptDateFilterRoutes);
app.use('/api/accReceiptParkStatus', accReceiptParkStatusRoutes);
app.use('/api/updateAccReceiptStatus', patchAccReceiptStatusRoutes);

app.use('/api/counterReceiptDateFilter', counterReceiptDateFilterRoutes);
app.use('/api/counterReceiptParkStatus', counterReceiptParkStatusRoutes);
app.use('/api/updateCounterReceiptStatus', patchCounterReceiptstatusRoutes);

app.use('/api/newVehiclePurDateFilter', newVehiclePurchaseDateFilterRoutes)

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
