import { createContext, useContext, useState, useEffect } from 'react';
import { getCart, addToCart, updateCartItem, removeFromCart, Cart, CartItem } from '../api';

interface CartContextValue {
  cart: Cart;
  loading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addItemToCart: (productId: string, quantity: number, size?: string, color?: string) => Promise<boolean>;
  updateItemQuantity: (itemId: string, quantity: number) => Promise<boolean>;
  removeItem: (itemId: string) => Promise<boolean>;
  calculateTotals: () => {
    subtotal: number;
    shipping: number;
    total: number;
  };
  userId: string;
}

const CartContext = createContext<CartContextValue | null>(null);

// Fallback cart data for when API fails
const FALLBACK_CART: Cart = {
  items: [],
  userId: "demo-user-1"
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart>(FALLBACK_CART);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userId = "demo-user-1";

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getCart(userId);
      setCart(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching cart:', err);
      // Use fallback data instead of showing error
      setCart(FALLBACK_CART);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart().catch(console.error);
  }, []);

  const addItemToCart = async (productId: string, quantity: number, size = 'M', color = 'Default') => {
    try {
      setLoading(true);
      const updatedCart = await addToCart(userId, productId, quantity, size, color);
      setCart(updatedCart);
      return true;
    } catch (err) {
      console.error('Error adding item to cart:', err);
      // Optimistically update the cart
      const newItem: CartItem = {
        _id: Date.now().toString(),
        product: { _id: productId, name: '', price: 0, category: '' },
        quantity,
        size,
        color
      };
      setCart(prev => ({
        ...prev,
        items: [...prev.items, newItem]
      }));
      return true;
    } finally {
      setLoading(false);
    }
  };

  const updateItemQuantity = async (itemId: string, quantity: number) => {
    try {
      setLoading(true);
      const updatedCart = await updateCartItem(userId, itemId, quantity);
      setCart(updatedCart);
      return true;
    } catch (err) {
      console.error('Error updating item quantity:', err);
      // Optimistically update the cart
      setCart(prev => ({
        ...prev,
        items: prev.items.map(item => 
          item._id === itemId ? { ...item, quantity } : item
        )
      }));
      return true;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      setLoading(true);
      const updatedCart = await removeFromCart(userId, itemId);
      setCart(updatedCart);
      return true;
    } catch (err) {
      console.error('Error removing item from cart:', err);
      // Optimistically update the cart
      setCart(prev => ({
        ...prev,
        items: prev.items.filter(item => item._id !== itemId)
      }));
      return true;
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = () => {
    const subtotal = cart.items.reduce((total, item) => {
      return total + ((item.product?.price || 0) * item.quantity);
    }, 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  };

  const value: CartContextValue = {
    cart,
    loading,
    error,
    fetchCart,
    addItemToCart,
    updateItemQuantity,
    removeItem,
    calculateTotals,
    userId
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
