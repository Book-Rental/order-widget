export interface BookDetailsBook {
  _id: string;
  name: string;
  author: string;
  language: string;
  category: string;
  edition: string;
  coverImage: string;
}

export interface BookDetailsSeller {
  _id: string;
}

export interface RentalDetails {
  rentalPrice: number;
  securityDeposit: number;
  rentalDuration: number;
  rentStartDate: string | null;
  expectedReturnDate: string | null;
  actualReturnDate: string | null;
  extensionCount: number;
  maximumExtensions: number;
  extendedUntil: string | null;
  lateFee: number;
}

export interface OrderAddress {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface PaymentDetails {
  paymentMethod: string;
  paymentStatus: string;
  transactionId: string | null;
  paidAt: string | null;
}

export interface PriceSummary {
  rentalAmount: number;
  securityDeposit: number;
  deliveryFee: number;
  discount: number;
  tax: number;
  totalAmount: number;
  refundAmount: number;
}

export interface DepositDetails {
  amount: number;
  status: string;
  refundedAmount: number;
  deductionAmount: number;
  deductionReason: string;
  refundedDate: string | null;
}

export type ItemStatus = | "pending"  | "confirmed" | "shipped" | "delivered" | "returned" | "cancelled";

export interface OrderBookDetails {
  orderId: string;
  orderNumber: string;
  orderDate: string;
  orderStatus: ItemStatus;
  quantity: number;
  itemStatus: ItemStatus;
  book: BookDetailsBook;
  seller: BookDetailsSeller;
  rental: RentalDetails;
  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;
  payment: PaymentDetails;
  priceSummary: PriceSummary;
  deposit: DepositDetails;
}