const axios = require('axios');


const getCounterReceiptParkStatus = async (req, res) => {
    try {
        const { fromDate, toDate, status } = req.query;

        if (!fromDate || !toDate || status === undefined) {
            return res.status(400).json({ error: 'From and To Dates, and Status were required' });
        }

        const username = process.env.SAP_USERNAME;
        const sapPassword = process.env.SAP_PASSWORD;
        const basicAuth = Buffer.from(`${username}:${sapPassword}`).toString('base64');

        let filter = `CreationDate ge datetime'${fromDate}' and CreationDate le datetime'${toDate}'`;

        if (status !== undefined) {
            filter += ` and Status eq '${status}'`;
        }

        const counterReceiptParkStatusUrl = `${process.env.SAP_BASEURL}${process.env.COUNTER_RECEIPT_PARKPOST_STATUS}?filter=${encodeURIComponent(filter)}&count=allpages`;

        const response = await axios.get(counterReceiptParkStatusUrl, {
            headers: { Authorization: `Basic ${basicAuth}` }
        });

        res.json(response.data.d || { __count: "0", results: [] });

    } catch (error) {
        console.error('Error fetching Park and Post Account Receipt data:', error.message);
        console.error('Error details:', error.response?.data);
        res.status(500).json({
            error: 'Failed',
            details: error.response?.data || error.message
        });
    }
};

module.exports = {getCounterReceiptParkStatus};