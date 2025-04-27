import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Product API calls
export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  sizes?: string[];
  colors?: string[];
  image?: string;
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${category} products:`, error);
    throw error;
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

// Cart API calls
export interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    category: string;
    image?: string;
  };
  quantity: number;
  size: string;
  color: string;
}

export interface Cart {
  items: CartItem[];
  userId: string;
}

export const getCart = async (userId: string): Promise<Cart> => {
  try {
    const response = await axios.get(`${API_URL}/cart/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const addToCart = async (
  userId: string,
  productId: string,
  quantity: number,
  size: string,
  color: string
): Promise<Cart> => {
  try {
    const response = await axios.post(`${API_URL}/cart/add`, {
      userId,
      productId,
      quantity,
      size,
      color
    });
    return response.data;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
};

export const updateCartItem = async (
  userId: string,
  itemId: string,
  quantity: number
): Promise<Cart> => {
  try {
    const response = await axios.put(`${API_URL}/cart/update`, {
      userId,
      itemId,
      quantity
    });
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

export const removeFromCart = async (
  userId: string,
  itemId: string
): Promise<Cart> => {
  try {
    const response = await axios.delete(`${API_URL}/cart/${userId}/${itemId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
};
