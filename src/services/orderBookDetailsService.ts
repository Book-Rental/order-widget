import type { OrderBookDetails } from "../types/orderedBookDetalils";
const API_URL = import.meta.env.VITE_API_URL;

interface OrderBookDetailsResponse {
  status: string;
  message: string;
  data: OrderBookDetails;
}
export const getOrderBookDetails = async (
  orderId: string,
  bookId: string
): Promise<OrderBookDetailsResponse> => {
  const response = await fetch(
    `${API_URL}/api/order/${orderId}/book/${bookId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch ordered book details.");
  }
  return response.json();
};