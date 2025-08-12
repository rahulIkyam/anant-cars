const axios = require('axios');

const getSalesCountRecords = async (req, res) => {
    try {
        const { fromDate, toDate } = req.query;

        if(!fromDate || !toDate) {
            return res.status(400).json({ error: 'From and To Dates were required'});
        }

        const username = process.env.SAP_USERNAME;
        const sapPassword = process.env.SAP_PASSWORD;
        const basicAuth = Buffer.from(`${username}:${sapPassword}`).toString('base64');

        const salesCountRecordUrl = `${process.env.SALES_COUNT_RECORDS}?count=allpages&filter=CreationDate ge datetime'${fromDate}' and CreationDate le datetime'${toDate}'`;

        const response = await axios.get(salesCountRecordUrl, {
            headers: { Authorization: `Basic ${basicAuth}`}
        });
        res.json(response.data.d || []);

    } catch (error) {
        console.error('Error fetching count records data by from and to dates:', error.message);
        res.status(500).json({ error: 'Failed' });
    }
};

module.exports = {getSalesCountRecords};