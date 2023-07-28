export interface Order {
  user: string | null;
  products: any[];
  totalAmount: number;
  shippingAddress: string;
  phone: string;
  email: string;
  name: string;
  lastname: string;
  couponId: string; // Add the couponId field
}
