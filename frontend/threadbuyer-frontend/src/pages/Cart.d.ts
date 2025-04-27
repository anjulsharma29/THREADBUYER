import { ReactNode } from 'react';
import { CartItem } from '../api';

export interface CartProps {
  children?: ReactNode;
}

declare const Cart: React.FC<CartProps>;
export default Cart; 