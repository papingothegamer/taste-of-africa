'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { Order } from '@/lib/types/user';
import { useAuth } from './authContext';

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getUserOrders: () => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  // Load orders when user changes
  useEffect(() => {
    if (user) {
      const storedOrders = localStorage.getItem(`orders_${user.id}`);
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
    } else {
      setOrders([]);
    }
  }, [user]);

  const addOrder = (order: Order) => {
    const newOrders = [...orders, order];
    setOrders(newOrders);
    
    if (user) {
      localStorage.setItem(`orders_${user.id}`, JSON.stringify(newOrders));
      
      // Update user's orders in auth context if needed
      if (user.orders) {
        user.orders = newOrders;
      }
    }
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  const getUserOrders = () => {
    if (user) {
      const storedOrders = localStorage.getItem(`orders_${user.id}`);
      if (storedOrders) {
        return JSON.parse(storedOrders);
      }
    }
    return [];
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrderById, getUserOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
