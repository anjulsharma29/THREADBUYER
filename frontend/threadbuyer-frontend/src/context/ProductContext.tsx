import { createContext, useState, useContext, useEffect } from 'react';
import { getProducts, getProductsByCategory, getProductById, Product } from '../api';

interface ProductContextValue {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProductsByCategory: (category: string) => Promise<Product[]>;
  fetchProductById: (id: string) => Promise<Product | null>;
}

const ProductContext = createContext<ProductContextValue | null>(null);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
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
  const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
    try {
      setLoading(true);
      const data = await getProductsByCategory(category);
      return data;
    } catch (err) {
      setError(`Failed to fetch ${category} products. Using dummy data instead.`);
      // Fallback to dummy data if API fails
      console.log('Using dummy data for category:', category);
      // Convert category to lowercase to match DUMMY_PRODUCTS keys
      const categoryKey = category.toLowerCase();
      console.log('Dummy data:', DUMMY_PRODUCTS[categoryKey]);
      return DUMMY_PRODUCTS[categoryKey] || [];
    } finally {
      setLoading(false);
    }
  };
  
  // Function to fetch product by ID
  const fetchProductById = async (id: string): Promise<Product | null> => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      return data;
    } catch (err) {
      setError(`Failed to fetch product details. Using dummy data instead.`);
      // Fallback to dummy data if API fails
      // Find product in dummy data
      for (const category in DUMMY_PRODUCTS) {
        const product = DUMMY_PRODUCTS[category].find(p => p._id === id);
        if (product) return product;
      }
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const value: ProductContextValue = {
    products,
    loading,
    error,
    fetchProductsByCategory,
    fetchProductById
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

// Dummy products data for fallback
const DUMMY_PRODUCTS: Record<string, Product[]> = {
  men: [
    { 
      _id: 'm1', 
      name: 'Classic Fit Shirt', 
      category: 'Men', 
      price: 1299, 
      description: 'A comfortable classic fit shirt perfect for formal occasions. Made with high-quality cotton fabric for breathability and durability.', 
      sizes: ['S', 'M', 'L', 'XL'], 
      colors: ['White', 'Blue', 'Black'],
      image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500&auto=format&fit=crop&q=60'
    },
    { 
      _id: 'm2', 
      name: 'Slim Fit Jeans', 
      category: 'Men', 
      price: 1499, 
      description: 'Modern slim fit jeans with a stylish look. Features durable denim material with slight stretch for comfort.', 
      sizes: ['30', '32', '34', '36'], 
      colors: ['Blue', 'Black', 'Grey'],
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60'
    },
    { 
      _id: 'm3', 
      name: 'Casual T-Shirt', 
      category: 'Men', 
      price: 699, 
      description: 'Comfortable casual t-shirt for everyday wear. Made with soft cotton material that feels great against your skin.', 
      sizes: ['S', 'M', 'L', 'XL', 'XXL'], 
      colors: ['White', 'Black', 'Grey', 'Navy'],
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60'
    },
    { 
      _id: 'm4', 
      name: 'Formal Blazer', 
      category: 'Men', 
      price: 2999, 
      description: 'Elegant formal blazer for professional settings. Tailored fit with premium fabric for a sophisticated look.', 
      sizes: ['38', '40', '42', '44'], 
      colors: ['Black', 'Navy', 'Grey'],
      image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=500&auto=format&fit=crop&q=60'
    },
  ],
  women: [
    { 
      _id: 'w1', 
      name: 'Floral Print Dress', 
      category: 'Women', 
      price: 1599, 
      description: 'Beautiful floral print dress perfect for summer outings. Made with lightweight fabric for comfort in warm weather.', 
      sizes: ['XS', 'S', 'M', 'L'], 
      colors: ['Pink', 'Blue', 'Yellow'],
      image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=500&auto=format&fit=crop&q=60'
    },
    { 
      _id: 'w2', 
      name: 'High-Waist Jeans', 
      category: 'Women', 
      price: 1399, 
      description: 'Trendy high-waist jeans with a flattering fit. Features premium denim with the right amount of stretch.', 
      sizes: ['26', '28', '30', '32'], 
      colors: ['Blue', 'Black', 'White'],
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=60'
    },
    { 
      _id: 'w3', 
      name: 'Casual Blouse', 
      category: 'Women', 
      price: 899, 
      description: 'Versatile casual blouse that pairs well with jeans or skirts. Soft fabric with elegant design details.', 
      sizes: ['XS', 'S', 'M', 'L', 'XL'], 
      colors: ['White', 'Pink', 'Mint', 'Black'],
      image: 'https://images.unsplash.com/photo-1604575396136-79d175778d1d?w=500&auto=format&fit=crop&q=60'
    },
    { 
      _id: 'w4', 
      name: 'Formal Trousers', 
      category: 'Women', 
      price: 1299, 
      description: 'Professional formal trousers for office wear. Tailored fit with comfortable stretch for all-day wear.', 
      sizes: ['26', '28', '30', '32', '34'], 
      colors: ['Black', 'Navy', 'Grey'],
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&auto=format&fit=crop&q=60'
    },
  ],
  kids: [
    { 
      _id: 'k1', 
      name: 'Cartoon Print T-Shirt', 
      category: 'Kids', 
      price: 499, 
      description: 'Fun cartoon print t-shirt that kids will love. Made with soft cotton for all-day comfort.', 
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'], 
      colors: ['Red', 'Blue', 'Green'],
      image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500&auto=format&fit=crop&q=60'
    },
    { 
      _id: 'k2', 
      name: 'Denim Shorts', 
      category: 'Kids', 
      price: 699, 
      description: 'Durable denim shorts perfect for active kids. Features adjustable waistband for growing children.', 
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'], 
      colors: ['Blue', 'Light Blue'],
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500&auto=format&fit=crop&q=60'
    },
    { 
      _id: 'k3', 
      name: 'Casual Dress', 
      category: 'Kids', 
      price: 799, 
      description: 'Pretty casual dress for special occasions. Made with comfortable fabric and adorable design.', 
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'], 
      colors: ['Pink', 'Purple', 'Yellow'],
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60'
    },
    { 
      _id: 'k4', 
      name: 'School Uniform Set', 
      category: 'Kids', 
      price: 1299, 
      description: 'Complete school uniform set including shirt and trousers/skirt. Made with durable, easy-care fabric.', 
      sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'], 
      colors: ['White/Navy', 'White/Grey'],
      image: 'https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?w=500&auto=format&fit=crop&q=60'
    },
  ]
};
