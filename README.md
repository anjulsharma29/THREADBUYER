# ThreadBuyer E-commerce Website

ThreadBuyer is a Myntra-inspired e-commerce clothing website that provides a seamless shopping experience for users looking to browse and purchase clothing items across different categories.

## Features

- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Product Browsing**: Browse products by categories (Men, Women, Kids)
- **Product Details**: View detailed information about products including sizes, colors, and descriptions
- **Shopping Cart**: Add items to cart, update quantities, and remove items
- **Clean UI**: Orange, Black, and White color scheme for a modern look

## Technology Stack

### Frontend
- **React**: UI library for building the user interface
- **React Router**: For multi-page navigation
- **Tailwind CSS**: For styling and responsive design
- **Context API**: For state management
- **Axios**: For API requests

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for Node.js
- **MongoDB**: Database (using MongoDB Memory Server for development)
- **Mongoose**: MongoDB object modeling for Node.js

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or pnpm package manager
- Git

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:(ignore)
   - Create a `.env` file in the backend directory
   - Add the following variables:
     ```
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/threadbuyer
     ```

4. Seed the database:
   ```
   node seedMemoryDb.js
   ```

5. Start the backend server:
   ```
   npm run dev
   ```
   The server will run on http://localhost:5000

6. If Terminal freezes open a new bash terminal and write cd backend -> npm run dev (MongoDB should connect with that)

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend/threadbuyer-frontend
   ```

2. Install dependencies:
   ```
   npm install --legacy-peer-deps
   # or if using pnpm
   pnpm install
   ```

3. Start the development server:
   ```
   npm run dev
   # or if using pnpm
   pnpm run dev
   ```
   The frontend will run on http://localhost:5173

## API Documentation

### Products API

#### Get All Products
- **URL**: `/api/products`
- **Method**: GET
- **Response**: Array of product objects

#### Get Products by Category
- **URL**: `/api/products/category/:category`
- **Method**: GET
- **URL Params**: category=[men|women|kids]
- **Response**: Array of product objects filtered by category

#### Get Product by ID
- **URL**: `/api/products/:id`
- **Method**: GET
- **URL Params**: id=[product_id]
- **Response**: Single product object

### Cart API

#### Get Cart
- **URL**: `/api/cart/:userId`
- **Method**: GET
- **URL Params**: userId=[user_id]
- **Response**: Cart object with items array

#### Add to Cart
- **URL**: `/api/cart/add`
- **Method**: POST
- **Body**:
  ```json
  {
    "userId": "string",
    "productId": "string",
    "quantity": number,
    "size": "string",
    "color": "string"
  }
  ```
- **Response**: Updated cart object

#### Update Cart Item
- **URL**: `/api/cart/update`
- **Method**: PUT
- **Body**:
  ```json
  {
    "userId": "string",
    "itemId": "string",
    "quantity": number
  }
  ```
- **Response**: Updated cart object

#### Remove from Cart
- **URL**: `/api/cart/:userId/:itemId`
- **Method**: DELETE
- **URL Params**: 
  - userId=[user_id]
  - itemId=[item_id]
- **Response**: Updated cart object

## Deployment Instructions

### Backend Deployment
1. Ensure MongoDB is installed and running (for production)
2. Update the MONGO_URI in the .env file to point to your production database
3. Install PM2 or similar process manager:
   ```
   npm install -g pm2
   ```
4. Start the server with PM2:
   ```
   pm2 start server.js
   ```

### Frontend Deployment
1. Build the frontend:
   ```
   cd threadbuyer/frontend/threadbuyer-frontend
   npm run build
   # or if using pnpm
   pnpm build
   ```
2. The build files will be in the `dist` directory
3. Deploy these files to a static hosting service like Netlify, Vercel, or GitHub Pages

## Project Structure

```
threadbuyer/
├── backend/
│   ├── controllers/
│   │   ├── cartController.js
│   │   └── productController.js
│   ├── models/
│   │   ├── Cart.js
│   │   └── Product.js
│   ├── routes/
│   │   ├── cartRoutes.js
│   │   └── productRoutes.js
│   ├── .env
│   ├── package.json
│   ├── seedMemoryDb.js
│   └── server.js
└── frontend/
    └── threadbuyer-frontend/
        ├── public/
        ├── src/
        │   ├── api/
        │   │   └── index.js
        │   ├── components/
        │   │   └── Navbar.tsx
        │   ├── context/
        │   │   ├── CartContext.jsx
        │   │   └── ProductContext.jsx
        │   ├── pages/
        │   │   ├── Cart.tsx
        │   │   ├── CategoryPage.tsx
        │   │   ├── Home.tsx
        │   │   └── ProductDetail.tsx
        │   ├── App.tsx
        │   └── main.tsx
        ├── package.json
        └── vite.config.ts
```

## Color Scheme
- **Primary/Accent Color**: Orange (#f97316)
- **Text/Elements**: Black (#000000)
- **Background**: White (#ffffff)

## License
This project is licensed under the MIT License.
