"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { User, UserAddress, PaymentMethod } from '../../lib/types/user';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  updateUser: (userData: Partial<User>) => void;
  updateAddress: (address: UserAddress) => void;
  addPaymentMethod: (paymentMethod: PaymentMethod) => void;
  removePaymentMethod: (paymentMethodId: string) => void;
  setDefaultPaymentMethod: (paymentMethodId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      email,
      name: 'John Doe',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const signup = async (email: string, password: string, name: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = {
        ...user,
        ...userData,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const updateAddress = (address: UserAddress) => {
    if (user) {
      updateUser({ address });
    }
  };

  const addPaymentMethod = (paymentMethod: PaymentMethod) => {
    if (user) {
      const currentMethods = user.paymentMethods || [];
      if (paymentMethod.isDefault) {
        currentMethods.forEach(method => method.isDefault = false);
      }
      updateUser({
        paymentMethods: [...currentMethods, paymentMethod]
      });
    }
  };

  const removePaymentMethod = (paymentMethodId: string) => {
    if (user && user.paymentMethods) {
      updateUser({
        paymentMethods: user.paymentMethods.filter(method => method.id !== paymentMethodId)
      });
    }
  };

  const setDefaultPaymentMethod = (paymentMethodId: string) => {
    if (user && user.paymentMethods) {
      const updatedMethods = user.paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === paymentMethodId
      }));
      updateUser({ paymentMethods: updatedMethods });
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isLoading,
      updateUser,
      updateAddress,
      addPaymentMethod,
      removePaymentMethod,
      setDefaultPaymentMethod
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
