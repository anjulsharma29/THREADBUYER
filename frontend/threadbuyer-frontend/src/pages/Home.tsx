import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gray-100 rounded-lg p-8 mb-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-black mb-4">Welcome to ThreadBuyer</h1>
          <p className="text-lg text-gray-700 mb-6">Discover the latest trends in fashion with our curated collection</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/men" className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">
              Shop Men
            </Link>
            <Link to="/women" className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">
              Shop Women
            </Link>
            <Link to="/kids" className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">
              Shop Kids
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-64 bg-gray-200"></div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-black mb-2">Men's Collection</h3>
              <p className="text-gray-600 mb-4">Explore our latest men's fashion collection</p>
              <Link to="/men" className="text-orange-500 font-medium hover:underline">
                Shop Now →
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-64 bg-gray-200"></div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-black mb-2">Women's Collection</h3>
              <p className="text-gray-600 mb-4">Discover trendy styles for every occasion</p>
              <Link to="/women" className="text-orange-500 font-medium hover:underline">
                Shop Now →
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-64 bg-gray-200"></div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-black mb-2">Kids' Collection</h3>
              <p className="text-gray-600 mb-4">Comfortable and stylish clothing for kids</p>
              <Link to="/kids" className="text-orange-500 font-medium hover:underline">
                Shop Now →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-black mb-1">Product Name</h3>
                <p className="text-gray-600 text-sm mb-2">Category</p>
                <div className="flex justify-between items-center">
                  <span className="text-black font-bold">₹1,299</span>
                  <button className="text-orange-500 hover:text-orange-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gray-100 rounded-lg p-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-6">Stay updated with the latest trends and exclusive offers</p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
