import { ReactNode } from 'react';

export interface Product {
  id: string;
  _id?: string;
  name: string;
  category: string;
  price: number;
  description: string;
  sizes: string[];
  colors: string[];
  image?: string;
}

export interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProductsByCategory: (category: string) => Promise<Product[]>;
  fetchProductById: (id: string) => Promise<Product | null>;
}

export interface ProductProviderProps {
  children: ReactNode;
}

export const useProducts: () => ProductContextType;
export const ProductProvider: React.FC<ProductProviderProps>; 