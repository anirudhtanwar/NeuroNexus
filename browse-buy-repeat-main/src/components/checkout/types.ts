
export interface ShippingInfo {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface PaymentInfo {
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  paymentMethod: 'credit-card' | 'paypal';
}

export interface CheckoutPrices {
  subtotal: number;
  shippingPrice: number;
  taxAmount: number;
  orderTotal: number;
}

export interface FilterOptions {
  priceRange: [number, number];
  quality: string[];
  isNew: boolean;
  isSale: boolean;
  sortBy: 'latest' | 'price-low' | 'price-high' | 'rating';
}
