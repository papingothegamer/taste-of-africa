'use client'

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from './authContext';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  rating: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  cartTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (user) {
      const storedCart = localStorage.getItem(`cart_${user.id}`);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } else {
      setCartItems([]);
    }
  }, [user]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    if (user) {
      setCartItems(prev => {
        const existingItem = prev.find(i => i.id === item.id);
        if (existingItem) {
          const updated = prev.map(i => 
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
          localStorage.setItem(`cart_${user.id}`, JSON.stringify(updated));
          return updated;
        }
        const updated = [...prev, { ...item, quantity: 1 }];
        localStorage.setItem(`cart_${user.id}`, JSON.stringify(updated));
        return updated;
      });
    }
  };

  const removeFromCart = (itemId: string) => {
    if (user) {
      const updated = cartItems.filter(item => item.id !== itemId);
      setCartItems(updated);
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(updated));
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (user) {
      const updated = cartItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      setCartItems(updated);
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(updated));
    }
  };

  const clearCart = () => {
    if (user) {
      setCartItems([]);
      localStorage.removeItem(`cart_${user.id}`);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartTotal = total;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      total,
      cartTotal,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
