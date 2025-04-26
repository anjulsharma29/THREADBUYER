import { createContext, useState, useContext, useEffect } from 'react';
import { getProducts, getProductsByCategory, getProductById } from '../api';

// Create context
const ProductContext = createContext();

// Create provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch all products on initial load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products. Using dummy data instead.');
        // Fallback to dummy data if API fails
        setProducts(DUMMY_PRODUCTS.men.concat(DUMMY_PRODUCTS.women, DUMMY_PRODUCTS.kids));
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Function to fetch products by category
  const fetchProductsByCategory = async (category) => {
    try {
      setLoading(true);
      const data = await getProductsByCategory(category);
      return data;
    } catch (err) {
      setError(`Failed to fetch ${category} products. Using dummy data instead.`);
      // Fallback to dummy data if API fails
      return DUMMY_PRODUCTS[category] || [];
    } finally {
      setLoading(false);
    }
  };
  
  // Function to fetch product by ID
  const fetchProductById = async (id) => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      return data;
    } catch (err) {
      setError(`Failed to fetch product details. Using dummy data instead.`);
      // Fallback to dummy data if API fails
      // Find product in dummy data
      for (const category in DUMMY_PRODUCTS) {
        const product = DUMMY_PRODUCTS[category].find(p => p.id === id);
        if (product) return product;
      }
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ProductContext.Provider 
      value={{ 
        products, 
        loading, 
        error, 
        fetchProductsByCategory,
        fetchProductById
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Create custom hook to use the product context
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

// Dummy products data for fallback
const DUMMY_PRODUCTS = {
  men: [
    { id: 'm1', name: 'Classic Fit Shirt', category: 'Men', price: 1299, description: 'A comfortable classic fit shirt perfect for formal occasions. Made with high-quality cotton fabric for breathability and durability.', sizes: ['S', 'M', 'L', 'XL'], colors: ['White', 'Blue', 'Black'] },
    { id: 'm2', name: 'Slim Fit Jeans', category: 'Men', price: 1499, description: 'Modern slim fit jeans with a stylish look. Features durable denim material with slight stretch for comfort.', sizes: ['30', '32', '34', '36'], colors: ['Blue', 'Black', 'Grey'] },
    { id: 'm3', name: 'Casual T-Shirt', category: 'Men', price: 699, description: 'Comfortable casual t-shirt for everyday wear. Made with soft cotton material that feels great against your skin.', sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['White', 'Black', 'Grey', 'Navy'] },
    { id: 'm4', name: 'Formal Blazer', category: 'Men', price: 2999, description: 'Elegant formal blazer for professional settings. Tailored fit with premium fabric for a sophisticated look.', sizes: ['38', '40', '42', '44'], colors: ['Black', 'Navy', 'Grey'] },
  ],
  women: [
    { id: 'w1', name: 'Floral Print Dress', category: 'Women', price: 1599, description: 'Beautiful floral print dress perfect for summer outings. Made with lightweight fabric for comfort in warm weather.', sizes: ['XS', 'S', 'M', 'L'], colors: ['Pink', 'Blue', 'Yellow'] },
    { id: 'w2', name: 'High-Waist Jeans', category: 'Women', price: 1399, description: 'Trendy high-waist jeans with a flattering fit. Features premium denim with the right amount of stretch.', sizes: ['26', '28', '30', '32'], colors: ['Blue', 'Black', 'White'] },
    { id: 'w3', name: 'Casual Blouse', category: 'Women', price: 899, description: 'Versatile casual blouse that pairs well with jeans or skirts. Soft fabric with elegant design details.', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['White', 'Pink', 'Mint', 'Black'] },
    { id: 'w4', name: 'Formal Trousers', category: 'Women', price: 1299, description: 'Professional formal trousers for office wear. Tailored fit with comfortable stretch for all-day wear.', sizes: ['26', '28', '30', '32', '34'], colors: ['Black', 'Navy', 'Grey'] },
  ],
  kids: [
    { id: 'k1', name: 'Cartoon Print T-Shirt', category: 'Kids', price: 499, description: 'Fun cartoon print t-shirt that kids will love. Made with soft cotton for all-day comfort.', sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'], colors: ['Red', 'Blue', 'Green'] },
    { id: 'k2', name: 'Denim Shorts', category: 'Kids', price: 699, description: 'Durable denim shorts perfect for active kids. Features adjustable waistband for growing children.', sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'], colors: ['Blue', 'Light Blue'] },
    { id: 'k3', name: 'Casual Hoodie', category: 'Kids', price: 899, description: 'Cozy hoodie for kids to stay warm and comfortable. Features soft inner lining and convenient pockets.', sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'], colors: ['Grey', 'Blue', 'Red', 'Black'] },
    { id: 'k4', name: 'School Uniform Set', category: 'Kids', price: 1299, description: 'Complete school uniform set including shirt and pants/skirt. Made with durable, easy-care fabric for daily wear.', sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'], colors: ['White/Navy', 'White/Grey'] },
  ]
};
