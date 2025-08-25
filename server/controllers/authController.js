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

        const loginUrl = `${process.env.SAP_BASEURL}${process.env.SAP_LOGIN_URL}?filter=UserName eq '${userEmail}' and Password eq '${password}'&expand=to_line`;

        const response = await axios.get(loginUrl, {
            headers: { Authorization: `Basic ${basicAuth}` }
        });

        res.json(response.data.d.results || []);
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({ error: 'Login Failed' });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { uuid, newPassword } = req.body;

        if (!uuid || !newPassword) {
            return res.status(400).json({ error: 'UUID and new Password are required' });
        }

        const username = process.env.SAP_USERNAME;
        const sapPassword = process.env.SAP_PASSWORD;
        const basicAuth = Buffer.from(`${username}:${sapPassword}`).toString('base64');

        const resetUrl = `${process.env.SAP_BASEURL}${process.env.SAP_RESET_PASSWORD}?UUID=${uuid}`;
        const response = await axios.patch(resetUrl,
            { Password: newPassword },
            { headers: { Authorization: `Basic ${basicAuth}` } }
        );

        res.json({ success: true, message: 'Password updated successfully' });

    } catch (error) {
        console.error('Error resetting password:', error.message);
        res.status(500).json({
            error: 'Password reset failed',
            details: error.response?.data || error.message
        });
    }
};

module.exports = { login, resetPassword };
