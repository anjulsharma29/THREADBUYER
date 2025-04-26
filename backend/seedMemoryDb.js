const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Sample product data
const products = [
  // Men's products
  {
    name: 'Classic Fit Shirt',
    category: 'Men',
    price: 1299,
    description: 'A comfortable classic fit shirt perfect for formal occasions. Made with high-quality cotton fabric for breathability and durability.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Blue', 'Black'],
    image: ''
  },
  {
    name: 'Slim Fit Jeans',
    category: 'Men',
    price: 1499,
    description: 'Modern slim fit jeans with a stylish look. Features durable denim material with slight stretch for comfort.',
    sizes: ['30', '32', '34', '36'],
    colors: ['Blue', 'Black', 'Grey'],
    image: ''
  },
  {
    name: 'Casual T-Shirt',
    category: 'Men',
    price: 699,
    description: 'Comfortable casual t-shirt for everyday wear. Made with soft cotton material that feels great against your skin.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Grey', 'Navy'],
    image: ''
  },
  {
    name: 'Formal Blazer',
    category: 'Men',
    price: 2999,
    description: 'Elegant formal blazer for professional settings. Tailored fit with premium fabric for a sophisticated look.',
    sizes: ['38', '40', '42', '44'],
    colors: ['Black', 'Navy', 'Grey'],
    image: ''
  },

  // Women's products
  {
    name: 'Floral Print Dress',
    category: 'Women',
    price: 1599,
    description: 'Beautiful floral print dress perfect for summer outings. Made with lightweight fabric for comfort in warm weather.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Pink', 'Blue', 'Yellow'],
    image: ''
  },
  {
    name: 'High-Waist Jeans',
    category: 'Women',
    price: 1399,
    description: 'Trendy high-waist jeans with a flattering fit. Features premium denim with the right amount of stretch.',
    sizes: ['26', '28', '30', '32'],
    colors: ['Blue', 'Black', 'White'],
    image: ''
  },
  {
    name: 'Casual Blouse',
    category: 'Women',
    price: 899,
    description: 'Versatile casual blouse that pairs well with jeans or skirts. Soft fabric with elegant design details.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Pink', 'Mint', 'Black'],
    image: ''
  },
  {
    name: 'Formal Trousers',
    category: 'Women',
    price: 1299,
    description: 'Professional formal trousers for office wear. Tailored fit with comfortable stretch for all-day wear.',
    sizes: ['26', '28', '30', '32', '34'],
    colors: ['Black', 'Navy', 'Grey'],
    image: ''
  },

  // Kids' products
  {
    name: 'Cartoon Print T-Shirt',
    category: 'Kids',
    price: 499,
    description: 'Fun cartoon print t-shirt that kids will love. Made with soft cotton for all-day comfort.',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    colors: ['Red', 'Blue', 'Green'],
    image: ''
  },
  {
    name: 'Denim Shorts',
    category: 'Kids',
    price: 699,
    description: 'Durable denim shorts perfect for active kids. Features adjustable waistband for growing children.',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    colors: ['Blue', 'Light Blue'],
    image: ''
  },
  {
    name: 'Casual Hoodie',
    category: 'Kids',
    price: 899,
    description: 'Cozy hoodie for kids to stay warm and comfortable. Features soft inner lining and convenient pockets.',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: ['Grey', 'Blue', 'Red', 'Black'],
    image: ''
  },
  {
    name: 'School Uniform Set',
    category: 'Kids',
    price: 1299,
    description: 'Complete school uniform set including shirt and pants/skirt. Made with durable, easy-care fabric for daily wear.',
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
    colors: ['White/Navy', 'White/Grey'],
    image: ''
  }
];

async function seedDatabase() {
  // Create an in-memory MongoDB instance
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  console.log(`MongoDB Memory Server URI: ${mongoUri}`);
  
  // Connect to the in-memory database
  await mongoose.connect(mongoUri);
  console.log('Connected to in-memory MongoDB instance');
  
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const createdProducts = await Product.insertMany(products);
    console.log(`Seeded ${createdProducts.length} products successfully`);
    
    // Log some sample products to verify
    const sampleProducts = await Product.find().limit(3);
    console.log('Sample products:', JSON.stringify(sampleProducts, null, 2));
    
    return { mongoServer, mongoUri };
  } catch (error) {
    console.error('Error seeding products:', error);
    await mongoose.disconnect();
    await mongoServer.stop();
    throw error;
  }
}

// Execute the seeding function
seedDatabase()
  .then(({ mongoServer, mongoUri }) => {
    console.log('Database seeding completed successfully');
    console.log('MongoDB Memory Server is running and populated with sample data');
    console.log('URI for connection:', mongoUri);
    
    // Update the .env file with the new URI
    const fs = require('fs');
    fs.writeFileSync('./.env', `PORT=5000\nMONGO_URI=${mongoUri}`);
    console.log('Updated .env file with in-memory MongoDB URI');
  })
  .catch(err => {
    console.error('Failed to seed database:', err);
    process.exit(1);
  });
