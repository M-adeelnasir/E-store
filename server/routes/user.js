const express = require('express');
const router = express.Router();

const { register, login, logout, forgotPassword, resetPassword, currentUser } = require('../controllers/user')
const { requireSignIn, checkAdmin, checkAuth, verifyJwt } = require('../middleware/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.post('/forgot/password', forgotPassword)
router.post('/password/reset/:resetLink', resetPassword)
router.get('/user/profile', verifyJwt, checkAuth, currentUser)

module.exports = router