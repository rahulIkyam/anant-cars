const axios = require('axios');

const getAccReceiptDateFilter = async (req, res) => {
    try {
        const { fromDate, toDate } = req.query;
        if(!fromDate || !toDate) {
            return res.status(400).json({ error: 'From and To Dates were required' });
        }

        const username = process.env.SAP_USERNAME;
        const sapPassword = process.env.SAP_PASSWORD;
        const basicAuth = Buffer.from(`${username}:${sapPassword}`).toString('base64'); 

        const accReceiptDateFilterUrl = `${process.env.SAP_BASEURL}${process.env.ACC_RECEIPT_DATE_FILTER}?filter=CreationDate ge datetime'${fromDate}' and CreationDate le datetime'${toDate}'`
        
        const response = await axios.get(accReceiptDateFilterUrl, {
            headers: { Authorization: `Basic ${basicAuth}` }
        });
        res.json(response.data.d || []);

    } catch (error) {
        console.error('Error fetching data by from and to dates Account Receipt:', error.message);
        res.status(500).json({ error: 'Failed' });
    }
};

module.exports = {getAccReceiptDateFilter};