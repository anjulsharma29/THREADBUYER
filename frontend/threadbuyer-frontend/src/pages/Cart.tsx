import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { 
    cart, 
    loading, 
    error, 
    fetchCart, 
    updateItemQuantity, 
    removeItem, 
    calculateTotals 
  } = useCart();
  
  const [localCart, setLocalCart] = useState({ items: [] });
  
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);
  
  useEffect(() => {
    if (cart) {
      setLocalCart(cart);
    }
  }, [cart]);
  
  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    await updateItemQuantity(itemId, newQuantity);
  };
  
  const handleRemoveItem = async (itemId) => {
    await removeItem(itemId);
  };
  
  const { subtotal, shipping, total } = calculateTotals();
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-black mb-8">Shopping Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-black mb-8">Shopping Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link to="/" className="inline-block bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-black mb-8">Shopping Cart</h1>
      
      {localCart.items.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link to="/" className="inline-block bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="lg:flex lg:gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              {localCart.items.map((item) => (
                <div key={item._id} className="border-b border-gray-200 last:border-b-0 p-4 flex flex-col sm:flex-row gap-4">
                  <div className="sm:w-24 h-24 bg-gray-200 rounded-md flex-shrink-0"></div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between mb-2">
                      <Link to={`/product/${item.product._id}`} className="text-lg font-semibold text-black hover:text-orange-500">
                        {item.product.name}
                      </Link>
                      <button 
                        className="text-gray-500 hover:text-red-500"
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-2">{item.product.category}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <span>Size: {item.size}</span>
                      <span>Color: {item.color}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <button 
                          className="border border-gray-300 rounded-l-md px-2 py-1 text-gray-600 hover:bg-gray-100"
                          onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="border-t border-b border-gray-300 px-3 py-1 text-center w-10">
                          {item.quantity}
                        </span>
                        <button 
                          className="border border-gray-300 rounded-r-md px-2 py-1 text-gray-600 hover:bg-gray-100"
                          onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="font-bold text-black">
                        ₹{item.product.price * item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center mb-8">
              <Link to="/" className="text-orange-500 hover:text-orange-600 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-black mb-4">Order Summary</h2>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-black">₹{subtotal}</span>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-black">₹{shipping}</span>
                </div>
                
                <div className="border-t border-gray-200 my-4"></div>
                
                <div className="flex justify-between mb-6">
                  <span className="text-lg font-bold text-black">Total</span>
                  <span className="text-lg font-bold text-black">₹{total}</span>
                </div>
                
                <button className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
