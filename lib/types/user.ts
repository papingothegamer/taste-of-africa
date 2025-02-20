export interface UserAddress {
  street: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  cardBrand?: string;
  last4?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cardType?: string;
  isDefault?: boolean;
}

export interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  shippingAddress: UserAddress;
  paymentMethod: PaymentMethod;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: UserAddress;
  paymentMethods?: PaymentMethod[];
  orders?: Order[];
  createdAt: string;
  updatedAt: string;
}
