const axios = require('axios');

const getSalesParkStatus = async (req, res) => {
    try {
        const { fromDate, toDate, status } = req.query;

        if(!fromDate || !toDate || !status) {
            return res.status(400).json({ error: 'From and To Dates, and Status were required'});
        }

        const username = process.env.SAP_USERNAME;
        const sapPassword = process.env.SAP_PASSWORD;
        const basicAuth = Buffer.from(`${username}:${sapPassword}`).toString('base64');

        const salesParkStatusUrl = `${process.env.SALES_PARKPOST_STATUS}?filter=CreationDate ge datetime'${fromDate}' and CreationDate le datetime'${toDate}' and Status eq '${status}'&count=allpages`;

        const response = await axios.get(salesParkStatusUrl, {
            headers: { Authorization: `Basic ${basicAuth}`}
        });


        res.json(response.data.d || { __count: "0", results: [] });

    } catch (error) {
        console.error('Error fetching Park and Post data:', error.message);
        res.status(500).json({ error: 'Failed' });
    }
};

module.exports = {getSalesParkStatus};