const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-black mb-6">ThreadBuyer E-commerce Website</h1>
        
        <p className="text-gray-700 mb-6">
          ThreadBuyer is a Myntra-inspired e-commerce clothing website that provides a seamless shopping experience for users looking to browse and purchase clothing items across different categories.
        </p>

        <h2 className="text-2xl font-bold text-black mb-4">Features</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li><strong>Responsive Design</strong>: Works on mobile, tablet, and desktop devices</li>
          <li><strong>Product Browsing</strong>: Browse products by categories (Men, Women, Kids)</li>
          <li><strong>Product Details</strong>: View detailed information about products including sizes, colors, and descriptions</li>
          <li><strong>Shopping Cart</strong>: Add items to cart, update quantities, and remove items</li>
          <li><strong>Clean UI</strong>: Orange, Black, and White color scheme for a modern look</li>
        </ul>

        <h2 className="text-2xl font-bold text-black mb-4">Technology Stack</h2>
        
        <h3 className="text-xl font-bold text-black mb-2">Frontend</h3>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li><strong>React</strong>: UI library for building the user interface</li>
          <li><strong>React Router</strong>: For multi-page navigation</li>
          <li><strong>Tailwind CSS</strong>: For styling and responsive design</li>
          <li><strong>Context API</strong>: For state management</li>
          <li><strong>Axios</strong>: For API requests</li>
        </ul>

        <h3 className="text-xl font-bold text-black mb-2">Backend</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li><strong>Node.js</strong>: JavaScript runtime</li>
          <li><strong>Express.js</strong>: Web framework for Node.js</li>
          <li><strong>MongoDB</strong>: Database (using MongoDB Memory Server for development)</li>
          <li><strong>Mongoose</strong>: MongoDB object modeling for Node.js</li>
        </ul>
      </div>
    </div>
  );
};

export default About; 