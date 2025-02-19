export interface UserAddress {
  street: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card';
  cardBrand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  shippingAddress: UserAddress;
  paymentMethod: Pick<PaymentMethod, 'id' | 'last4' | 'cardBrand'>;
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
