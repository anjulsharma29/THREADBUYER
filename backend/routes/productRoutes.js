const express = require('express');
const router = express.Router();
const { getProducts, getProductsByCategory, getProductById } = require('../controllers/productController');

// GET all products
router.get('/', getProducts);

// GET products by category
router.get('/category/:category', getProductsByCategory);

// GET product by ID
router.get('/:id', getProductById);

module.exports = router;
