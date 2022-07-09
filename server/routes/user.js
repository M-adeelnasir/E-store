const express = require('express');
const router = express.Router();

const { register, login, logout, forgotPassword } = require('../controllers/user')

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.post('/password/reset', forgotPassword)

module.exports = router