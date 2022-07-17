const express = require('express');
const router = express.Router();

const { create, getCategory, getProducts, categories, update, deleteCategory } = require('../controllers/category')
const { checkAdmin, checkAuth, verifyJwt } = require('../middleware/auth')



module.exports = router