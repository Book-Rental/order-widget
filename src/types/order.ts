export interface ShippingAddress {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface PaymentDetails {
  method: string;
  lastFourDigits: string;
  paymentStatus: "PAID" | "PENDING" | "FAILED";
}

export interface PriceSummary {
  rentalCharges: number;
  securityDeposit: number;
  shippingCharges: number;
  discount: number;
  grandTotal: number;
}

export type BookStatus =
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "RETURNED"
  | "CANCELLED";

export interface OrderBook {
  _id: string;
  name: string;
  author: string;
  coverImage: string;
  rentalPrice: number;
  securityDeposit: number;
  quantity: number;
  rentalDuration: string;
  rentalStartDate?: string;
  rentalEndDate?: string;
  estimatedDeliveryDate?: string;
  deliveredDate?: string;
  returnedDate?: string;
  cancelledDate?: string;
  status: BookStatus;
  publisher?: string;
  category?: string;
  language?: string;
  isbn?: string;
}

export interface OrderDetails {
  orderId: string;
  orderDate: string;
  orderStatus: "ACTIVE" | "COMPLETED" | "CANCELLED";
  shippingAddress: ShippingAddress;
  payment: PaymentDetails;
  priceSummary: PriceSummary;
  books: OrderBook[];
}