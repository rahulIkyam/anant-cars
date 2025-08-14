const express = require('express');
const { login, resetPassword } = require('../controllers/authController');
const router = express.Router();

router.get('/', login);
router.patch('/reset-password', resetPassword);

module.exports = router;
