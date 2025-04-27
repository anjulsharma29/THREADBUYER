import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/:category" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <footer className="bg-black text-white py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-orange-500">ThreadBuyer</h3>
                <p className="text-gray-400">Your one-stop destination for trendy fashion at affordable prices.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Shop</h4>
                <ul className="space-y-2">
                  <li><a href="/men" className="text-gray-400 hover:text-orange-500">Men</a></li>
                  <li><a href="/women" className="text-gray-400 hover:text-orange-500">Women</a></li>
                  <li><a href="/kids" className="text-gray-400 hover:text-orange-500">Kids</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Help</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-orange-500">FAQs</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-orange-500">Shipping</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-orange-500">Returns</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Contact</h4>
                <ul className="space-y-2">
                  <li className="text-gray-400">Email: support@threadbuyer.com</li>
                  <li className="text-gray-400">Phone: +91 1234567890</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
              <p>&copy; 2025 ThreadBuyer. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
