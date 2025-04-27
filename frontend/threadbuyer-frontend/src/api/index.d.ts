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

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Cart {
  items: CartItem[];
  userId: string;
}

export function getProducts(): Promise<Product[]>;
export function getProductsByCategory(category: string): Promise<Product[]>;
export function getProductById(id: string): Promise<Product>;

export function getCart(userId: string): Promise<Cart>;
export function addToCart(
  userId: string,
  productId: string,
  quantity: number,
  size: string,
  color: string
): Promise<Cart>;
export function updateCartItem(
  userId: string,
  itemId: string,
  quantity: number
): Promise<Cart>;
export function removeFromCart(
  userId: string,
  itemId: string
): Promise<Cart>; 