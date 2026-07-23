export interface Book {
  _id: string;
  name: string;
  language: string;
  author: string;
  edition: string;
  coverImage: string;
  purchasePrice: number;
  rentalPricePerDay: number;
  rentalPricePerWeek: number;
  rentalPricePerMonth: number;
  securityDeposit: number;
}

export type ItemStatus = | "pending"  | "confirmed" | "shipped" | "delivered" | "returned" | "cancelled";

export interface OrderItem {
  _id: string;
  bookId: Book;
  sellerId: string;
  quantity: number;
  itemStatus: ItemStatus;
  rental: RentalInfo;
  deposit: DepositInfo;
}

export interface OrderDetails {
  _id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  payment: Payment;
  amount: Amount;
  orderStatus: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RentalInfo {
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

export interface DepositInfo {
  amount: number;
  status: string;
  refundedAmount: number;
  deductionAmount: number;
  deductionReason: string;
  refundedDate: string | null;
}

export interface Payment {
  paymentMethod: string;
  paymentStatus: string;
  transactionId: string;
  paidAt: string;
}

export interface Address {
  name: string;
  phone: string;
  type: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  location: {
    type: string;
    coordinates: number[];
  };

  isDefault: boolean;
}

export interface Amount {
  rentalAmount: number;
  securityDeposit: number;
  deliveryFee: number;
  discount: number;
  tax: number;
  totalAmount: number;
  refundAmount: number;
}
