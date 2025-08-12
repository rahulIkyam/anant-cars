const axios = require('axios');


const getSales = async (req, res) => {
    try {
        const username = process.env.SAP_USERNAME;
        const password = process.env.SAP_PASSWORD;
        const basicAuth = Buffer.from(`${username}:${password}`).toString('base64');

        const response = await axios.get(process.env.SAP_URL, {
            headers: { Authorization: `Basic ${basicAuth}` }
        });
        res.json(response.data?.d?.results || []);
    } catch (error) {
        console.error('Error fetching SAP data:', error.message);
        res.status(500).json({ error: 'Failed to fetch SAP data' });
    }
};

module.exports = { getSales };