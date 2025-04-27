import { ReactNode } from 'react';
import { Cart, CartItem } from '../api';

export interface CartContextValue {
  cart: Cart;
  loading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addItemToCart: (productId: string, quantity: number, size?: string, color?: string) => Promise<boolean>;
  updateItemQuantity: (itemId: string, quantity: number) => Promise<boolean>;
  removeItem: (itemId: string) => Promise<boolean>;
  calculateTotals: () => {
    subtotal: number;
    shipping: number;
    total: number;
  };
  userId: string;
}

export interface CartProviderProps {
  children: ReactNode;
}

declare const CartContext: React.Context<CartContextValue>;
export const CartProvider: React.FC<CartProviderProps>;
export const useCart: () => CartContextValue; 