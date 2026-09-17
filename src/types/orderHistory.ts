export type OrderItem = {
  bookId: string;
  name: string;
  author: string;
  coverImage: string;
  rentalPrice: number;
  rentalType: string;
  totalPrice: number;
  itemStatus: string;
};

export type Order = {
  orderId: string;
  orderNumber: string;
  orderDate: string;
   orderType: "auction" | "rent";
  totalAmount: number;
  totalBooks: number;
  items: OrderItem[];
};