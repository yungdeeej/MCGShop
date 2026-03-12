export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: 'Wearables' | 'Clinical Wear' | 'Keepsakes' | 'Accessories' | 'Bundles';
  program?: 'Healthcare' | 'Business' | 'Architecture' | 'Massage Therapy';
  description: string;
  sizes?: string[];
  colors?: string[];
  badge?: string;
  featured: boolean;
  gradCollection: boolean;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}
