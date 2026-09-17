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

export type ItemStatus = | "pending"  | "confirmed" | "shipped" | "out_for_delivery" | "return_requested" | "delivered" | "returned" | "cancelled" | "rejected";

export type OrderItem = {
  _id: string;

  bookId: {
    _id: string;
    name: string;
    language: string;
    author: string;
    edition: string;
    purchasePrice: number;
    rentalPricePerDay: number;
    rentalPricePerWeek: number;
    rentalPricePerMonth: number;
    securityDeposit: number;
    coverImage: string;
  };

  sellerId: string;
  quantity: number;
  itemStatus: string;

  rental: {
    rentalDuration: number;
    rentStartDate: string;
    expectedReturnDate: string;
    actualReturnDate?: string | null;
    rentalPrice: number;
    securityDeposit: number;
    extensionCount: number;
    maximumExtensions: number;
  } | null;

  deposit: number | null;

  shipmentDetails: unknown[];
};

export type OrderDetails = {
  _id: string;
  orderNumber: string;
  orderType: "rent" | "auction";
  userId: string;

  items: OrderItem[];

  auctionDetails?: {
    auctionId: string;
    winningBidId: string;
    winningBidAmount: number;
    winnerId: string;
    wonAt: string;
  };

  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    phone: string;
  };

  payment: {
    paymentMethod: string;
    paymentStatus: string;
  };

  amount: {
    itemAmount: number;
    rentalAmount: number;
    securityDeposit: number;
    deliveryFee: number;
    discount: number;
    tax: number;
    totalAmount: number;
    refundAmount: number;
  };

  orderStatus: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

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
