'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './authContext';

interface WishlistItem {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  description?: string;
  category?: string;
  rating?: number;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string | number) => void;
  isInWishlist: (id: string | number) => boolean;
}

export const WishlistContext = createContext<WishlistContextType>({
  wishlistItems: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
});

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    if (user) {
      const storedWishlist = localStorage.getItem(`wishlist_${user.id}`);
      if (storedWishlist) {
        setWishlistItems(JSON.parse(storedWishlist));
      }
    } else {
      setWishlistItems([]);
    }
  }, [user]);

  const addToWishlist = (item: WishlistItem) => {
    if (user) {
      const newWishlist = [...wishlistItems, item];
      setWishlistItems(newWishlist);
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(newWishlist));
    }
  };

  const removeFromWishlist = (itemId: string | number) => {
    if (user) {
      const newWishlist = wishlistItems.filter(item => item.id !== itemId);
      setWishlistItems(newWishlist);
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(newWishlist));
    }
  };

  const isInWishlist = (itemId: string | number) => {
    return wishlistItems.some(item => item.id === itemId);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
