const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());

const PORT = process.env.PORT;

const salesRoutes = require('./routes/salesRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const authRoutes = require('./routes/authRoutes');
const salesDateFilterRoutes = require('./routes/salesDateFilterRoutes');
const salesRecordCountRoutes = require('./routes/salesCountRecordsRoutes');
const salesParkStatusRoutes = require('./routes/salesParkStatusRoutes');

app.use('/api/sales', salesRoutes);
app.use('/api/destination', destinationRoutes);
app.use('/api/login', authRoutes);
app.use('/api/salesDateFilter', salesDateFilterRoutes);
app.use('/api/salesRecordCount', salesRecordCountRoutes);
app.use('/api/salesParkStatus', salesParkStatusRoutes);

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
