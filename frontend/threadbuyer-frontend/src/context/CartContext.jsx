import { createContext, useState, useContext } from 'react';
import { getCart, addToCart, updateCartItem, removeFromCart } from '../api';

// Create context
const CartContext = createContext();

// Create provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Generate a temporary user ID for demo purposes
  // In a real app, this would come from authentication
  const userId = localStorage.getItem('userId') || 'user_' + Math.random().toString(36).substring(2, 9);
  
  // Save userId to localStorage if not already there
  if (!localStorage.getItem('userId')) {
    localStorage.setItem('userId', userId);
  }
  
  // Fetch cart
  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getCart(userId);
      setCart(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch cart. Using local data instead.');
      // Keep existing cart state
    } finally {
      setLoading(false);
    }
  };
  
  // Add item to cart
  const addItemToCart = async (productId, quantity, size, color) => {
    try {
      setLoading(true);
      const updatedCart = await addToCart(userId, productId, quantity, size, color);
      setCart(updatedCart);
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to add item to cart.');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Update cart item quantity
  const updateItemQuantity = async (itemId, quantity) => {
    try {
      setLoading(true);
      const updatedCart = await updateCartItem(userId, itemId, quantity);
      setCart(updatedCart);
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to update item quantity.');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Remove item from cart
  const removeItem = async (itemId) => {
    try {
      setLoading(true);
      const updatedCart = await removeFromCart(userId, itemId);
      setCart(updatedCart);
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to remove item from cart.');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Calculate cart totals
  const calculateTotals = () => {
    const subtotal = cart.items.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
    
    const shipping = subtotal > 0 ? 99 : 0;
    const total = subtotal + shipping;
    
    return { subtotal, shipping, total };
  };
  
  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        loading, 
        error, 
        fetchCart,
        addItemToCart,
        updateItemQuantity,
        removeItem,
        calculateTotals,
        userId
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Create custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
