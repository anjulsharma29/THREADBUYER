import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

const CategoryPage = () => {
  const { category } = useParams();
  const { fetchProductsByCategory, loading } = useProducts();
  
  const [products, setProducts] = useState([]);
  
  // Default to men if category is not valid
  const validCategory = category && ['men', 'women', 'kids'].includes(category) ? category : 'men';
  const categoryTitle = validCategory.charAt(0).toUpperCase() + validCategory.slice(1);
  
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
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <Link to={`/product/${product._id}`} className="block">
                  <h3 className="text-lg font-semibold text-black mb-1">{product.name}</h3>
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
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
