import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { Product } from '../api';

const CategoryPage = () => {
  const { category } = useParams();
  const { fetchProductsByCategory, loading } = useProducts();
  
  const [products, setProducts] = useState<Product[]>([]);
  
  // Default to men if category is not valid
  const validCategory = category && ['men', 'women', 'kids'].includes(category) ? category : 'men';
  const categoryTitle = validCategory.charAt(0).toUpperCase() + validCategory.slice(1);
  
  // Get placeholder image based on category and product name
  const getPlaceholderImage = (category: string, productName: string) => {
    // Use static placeholder images that are guaranteed to work
    const placeholders = {
      men: [
        'https://images.pexels.com/photos/2955375/pexels-photo-2955375.jpeg?auto=compress&cs=tinysrgb&w=500', // Classic Suit
        'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=500', // Casual Shirt
        'https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=500', // Denim Jacket
        'https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=500'  // Urban Style
      ],
      women: [
        // 1. Floral Dress
        'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=500',
        // 2. Casual Blouse
        'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=500',
        // 3. Elegant Skirt
        'https://images.pexels.com/photos/1485031/pexels-photo-1485031.jpeg?auto=compress&cs=tinysrgb&w=500',
        // 4. Business Suit
        'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=500&auto=format&fit=crop&q=60'
      ],
      kids: [
        'https://images.pexels.com/photos/5559986/pexels-photo-5559986.jpeg?auto=compress&cs=tinysrgb&w=500', // Kids Casual
        'https://images.pexels.com/photos/5559989/pexels-photo-5559989.jpeg?auto=compress&cs=tinysrgb&w=500', // Kids Party
        'https://images.pexels.com/photos/5559990/pexels-photo-5559990.jpeg?auto=compress&cs=tinysrgb&w=500', // Kids Play
        'https://images.pexels.com/photos/5559992/pexels-photo-5559992.jpeg?auto=compress&cs=tinysrgb&w=500'  // Kids School
      ]
    };
    
    // Use product name to generate a consistent index
    const index = productName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % placeholders[category as keyof typeof placeholders].length;
    return placeholders[category as keyof typeof placeholders][index];
  };
  
  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProductsByCategory(validCategory);
      setProducts(data);
    };
    
    getProducts();
  }, [validCategory, fetchProductsByCategory]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-sm rounded-lg p-4 mb-8 text-center">
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">{categoryTitle}'s Collection</h1>
        <p className="text-gray-600 mt-2">Discover our latest {validCategory}'s fashion collection</p>
      </div>
      
      {/* Filters - simplified for MVP */}
      <div className="bg-white shadow-sm rounded-lg p-4 mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          <span className="font-medium text-black">Filters:</span>
          <select className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option>All Categories</option>
            <option>Tops</option>
            <option>Bottoms</option>
            <option>Footwear</option>
            <option>Accessories</option>
          </select>
          
          <select className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option>Price: All</option>
            <option>Under ₹500</option>
            <option>₹500 - ₹1000</option>
            <option>₹1000 - ₹2000</option>
            <option>Above ₹2000</option>
          </select>
          
          <button className="ml-auto bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 transition-colors">
            Apply Filters
          </button>
        </div>
      </div>
      
      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="bg-white shadow-sm rounded-lg p-8 text-center">
          <p className="text-gray-600">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const productId = product._id;
            const imageUrl = product.image || getPlaceholderImage(validCategory, product.name);

            return (
              <div key={productId} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <img 
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = getPlaceholderImage(validCategory, product.name);
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <Link to={`/product/${productId}`} className="block">
                    <h3 className="text-lg font-semibold text-black mb-1 hover:text-orange-500 transition-colors">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-black font-bold">₹{product.price}</span>
                      <button className="text-orange-500 hover:text-orange-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
