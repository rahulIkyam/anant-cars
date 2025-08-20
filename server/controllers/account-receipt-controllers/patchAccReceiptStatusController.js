const axios = require('axios');

const patchAccReceiptStatusController = async (req, res) => {
    const { status } = req.body;
    const { uuid } = req.query; 

    const patchUrl = `${process.env.SAP_BASEURL}${process.env.ACC_RECEIPT_PATCH}/${uuid}`;

    try {
        if (!uuid || !status) {
            return res.status(400).json({ error: 'UUID and Status are required' });
        }

        const username = process.env.SAP_USERNAME;
        const sapPassword = process.env.SAP_PASSWORD;
        const basicAuth = Buffer.from(`${username}:${sapPassword}`).toString('base64');

        const response = await axios.patch(patchUrl,
            { Status: status },
            {
                headers: {
                    Authorization: `Basic ${basicAuth}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }
        );
        res.json({ success: true, message: 'Status updated successfully' });
    } catch (error) {
        console.error('Error Message:', error.message);
        res.status(500).json({
            error: 'Status Update Failed',
            details: error.response?.data || error.message
        });
    }
};


module.exports = {patchAccReceiptStatusController};