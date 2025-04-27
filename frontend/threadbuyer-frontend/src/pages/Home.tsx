import { Link } from 'react-router-dom';

const Home = () => {
  // Get placeholder image based on category
  const getPlaceholderImage = (category: string) => {
    const baseUrl = 'https://via.placeholder.com/400x400';
    const colors = {
      men: 'e2e8f0/1e293b', // Light gray background with dark text
      women: 'fce7f3/831843', // Light pink background with dark pink text
      kids: 'f0fdf4/166534' // Light green background with dark green text
    };
    return `${baseUrl}/${colors[category as keyof typeof colors]}?text=${category.charAt(0).toUpperCase() + category.slice(1)}'s+Collection`;
  };

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
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-64">
              <img 
                src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&auto=format&fit=crop&q=60"
                alt="Men's Collection"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = getPlaceholderImage('men');
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-black mb-2">Men's Collection</h3>
              <p className="text-gray-600 mb-4">Explore our latest men's fashion collection</p>
              <Link to="/men" className="text-orange-500 font-medium hover:underline">
                Shop Now →
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-64">
              <img 
                src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=500&auto=format&fit=crop&q=60"
                alt="Women's Collection"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = getPlaceholderImage('women');
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-black mb-2">Women's Collection</h3>
              <p className="text-gray-600 mb-4">Discover trendy styles for every occasion</p>
              <Link to="/women" className="text-orange-500 font-medium hover:underline">
                Shop Now →
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-64">
              <img 
                src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500&auto=format&fit=crop&q=60"
                alt="Kids' Collection"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = getPlaceholderImage('kids');
                }}
              />
            </div>
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
          {[
            {
              name: "Classic Fit Shirt",
              category: "men",
              price: 1299,
              image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500&auto=format&fit=crop&q=60"
            },
            {
              name: "Floral Print Dress",
              category: "women",
              price: 1599,
              image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&auto=format&fit=crop&q=60"
            },
            {
              name: "Cartoon Print T-Shirt",
              category: "kids",
              price: 499,
              image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500&auto=format&fit=crop&q=60"
            },
            {
              name: "Slim Fit Jeans",
              category: "men",
              price: 1499,
              image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60"
            }
          ].map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = getPlaceholderImage(product.category);
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
                <h3 className="text-lg font-semibold text-black mb-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                <div className="flex justify-between items-center">
                  <span className="text-black font-bold">₹{product.price}</span>
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
      <div className="bg-orange-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-black mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-6">Stay updated with our latest collections and exclusive offers</p>
        <div className="max-w-md mx-auto flex gap-4">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
