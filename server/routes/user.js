const express = require('express');
const router = express.Router();

const { register, login, logout, forgotPassword, resetPassword } = require('../controllers/user')

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.post('/forgot/password', forgotPassword)
router.post('/password/reset/:resetLink', resetPassword)

module.exports = router