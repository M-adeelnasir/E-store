const express = require('express');
const router = express.Router();

const { create, getSub, subs, update, deleteSub, getSubsOnCategory } = require('../controllers/sub')
const { checkAdmin, checkAuth, verifyJwt } = require('../middleware/auth')



module.exports = router