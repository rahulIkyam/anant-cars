const axios = require('axios');

const getDestination = async (req, res) => {
    try {
        const username = process.env.SAP_USERNAME;
        const password = process.env.DESTINATION_PASS;
        const basicAuth = Buffer.from(`${username}:${password}`).toString('base64');

        const response = await axios.get(process.env.DESTINATION_URL, {
            headers: { Authorization: `Basic ${basicAuth}` }
        });

        res.json(response.data?.d?.results || []);
    } catch (error) {
        console.error('Error fetching Destination data:', error.message);
        res.status(500).json({ error: 'Failed to fetch Destination data' });
    }
};

module.exports = { getDestination };
