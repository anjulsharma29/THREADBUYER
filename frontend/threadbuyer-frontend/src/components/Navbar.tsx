import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-orange-500">ThreadBuyer</Link>
        
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-black hover:text-orange-500 transition-colors">Home</Link>
          <Link to="/men" className="text-black hover:text-orange-500 transition-colors">Men</Link>
          <Link to="/women" className="text-black hover:text-orange-500 transition-colors">Women</Link>
          <Link to="/kids" className="text-black hover:text-orange-500 transition-colors">Kids</Link>
          <Link to="/about" className="text-black hover:text-orange-500 transition-colors">About</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="border border-gray-300 rounded-full py-1 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full md:w-64"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          
          <Link to="/cart" className="text-black hover:text-orange-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button className="md:hidden text-black">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
