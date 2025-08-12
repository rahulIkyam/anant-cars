const axios = require('axios');

const login = async (req, res) => {
    try {
        const { userEmail, password } = req.query;

        if (!userEmail || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const username = process.env.SAP_USERNAME;
        const sapPassword = process.env.SAP_PASSWORD;
        const basicAuth = Buffer.from(`${username}:${sapPassword}`).toString('base64');

        const loginUrl = `${process.env.SAP_LOGIN_URL}?filter=UserName eq '${userEmail}' and Password eq '${password}'`;

        const response = await axios.get(loginUrl, {
            headers: { Authorization: `Basic ${basicAuth}` }
        });

        res.json(response.data.d.results || []);
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({ error: 'Login Failed' });
    }
};

module.exports = { login };
