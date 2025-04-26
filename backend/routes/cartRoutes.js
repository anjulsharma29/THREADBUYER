const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart } = require('../controllers/cartController');

// GET cart by userId
router.get('/:userId', getCart);

// POST add item to cart
router.post('/add', addToCart);

// PUT update cart item quantity
router.put('/update', updateCartItem);

// DELETE remove item from cart
router.delete('/:userId/:itemId', removeFromCart);

module.exports = router;
