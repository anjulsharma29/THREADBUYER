import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { Product } from '../api';

const ProductDetail = () => {
  const { productId } = useParams();
  const { fetchProductById, loading: productLoading } = useProducts();
  const { addItemToCart, loading: cartLoading } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  
  useEffect(() => {
    const getProduct = async () => {
      if (productId) {
        const data = await fetchProductById(productId);
        if (data) {
          setProduct(data);
          // Set default selections if product is loaded
          if (data.sizes && data.sizes.length > 0) {
            setSelectedSize(data.sizes[0]);
          }
          if (data.colors && data.colors.length > 0) {
            setSelectedColor(data.colors[0]);
          }
        }
      }
    };
    
    getProduct();
  }, [productId, fetchProductById]);
  
  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      setError('Please select both size and color');
      return;
    }
    
    if (!product) {
      setError('Product not found');
      return;
    }
    
    setError(null);
    const success = await addItemToCart(
      product._id,
      quantity,
      selectedSize,
      selectedColor
    );
    
    if (success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError('Failed to add item to cart');
    }
  };
  
  if (productLoading || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2">
            <div className="h-64 md:h-96 bg-gray-200 relative">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Product+Image';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No image available
                </div>
              )}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2 p-6">
            <div className="mb-4">
              <span className="text-sm text-gray-500">{product.category}</span>
              <h1 className="text-2xl font-bold text-black mb-2">{product.name}</h1>
              <p className="text-xl font-bold text-black mb-4">₹{product.price}</p>
              <div className="border-t border-gray-200 my-4"></div>
              <p className="text-gray-600 mb-6">{product.description}</p>
            </div>
            
            {/* Size Selection */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-black mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes?.map((size: string) => (
                  <button
                    key={size}
                    className={`px-3 py-1 border rounded-md ${
                      selectedSize === size 
                        ? 'border-orange-500 bg-orange-50 text-orange-500' 
                        : 'border-gray-300 text-gray-700 hover:border-orange-500'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-black mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors?.map((color: string) => (
                  <button
                    key={color}
                    className={`px-3 py-1 border rounded-md ${
                      selectedColor === color 
                        ? 'border-orange-500 bg-orange-50 text-orange-500' 
                        : 'border-gray-300 text-gray-700 hover:border-orange-500'
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-black mb-2">Quantity</h3>
              <div className="flex items-center">
                <button 
                  className="border border-gray-300 rounded-l-md px-3 py-1 text-gray-600 hover:bg-gray-100"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="border-t border-b border-gray-300 px-4 py-1 text-center w-12">
                  {quantity}
                </span>
                <button 
                  className="border border-gray-300 rounded-r-md px-3 py-1 text-gray-600 hover:bg-gray-100"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Error and Success Messages */}
            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-2 bg-green-100 text-green-700 rounded-md">
                Item added to cart successfully!
              </div>
            )}
            
            {/* Add to Cart Button */}
            <button 
              className={`w-full ${
                cartLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-orange-500 hover:bg-orange-600'
              } text-white py-3 rounded-md transition-colors`}
              onClick={handleAddToCart}
              disabled={cartLoading}
            >
              {cartLoading ? 'Adding to Cart...' : 'Add to Cart'}
            </button>
            
            {/* Continue Shopping Link */}
            <div className="mt-4 text-center">
              <Link to="/" className="text-orange-500 hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
