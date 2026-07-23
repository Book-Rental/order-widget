import type { OrderDetails } from "../types/order";

const API_URL = import.meta.env.VITE_API_URL;

interface OrderDetailsResponse {
  status: string;
  message: string;
  data: OrderDetails;
}

export const getOrderDetails = async (
  orderId: string
): Promise<OrderDetailsResponse> => {
  const response = await fetch(
    `${API_URL}/api/order/${orderId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch order details.");
  }

  return response.json();
};