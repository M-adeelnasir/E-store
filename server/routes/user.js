const express = require('express');
const router = express.Router();

const { register, login, logout, forgotPassword, resetPassword, currentUser } = require('../controllers/user')
const { requireSignIn, checkAdmin, checkAuth } = require('../middleware/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.post('/forgot/password', forgotPassword)
router.post('/password/reset/:resetLink', resetPassword)
router.post('/user/current', currentUser)

module.exports = router