import { Order } from "../types/orderHistory";

const API_URL = import.meta.env.VITE_API_URL;

export interface OrdersResponse {
  orders: Order[];
  totalPages: number;
  currentPage: number;
}

export const getOrdersByUserId = async (
  userId: string,
  page: number
): Promise<OrdersResponse> => {
  const response = await fetch(
    `${API_URL}/api/order/getByUserId/${userId}?page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  const result = await response.json();

  return {
    orders: result?.data?.orders ?? [],
    totalPages: result?.data?.totalPages ?? 1,
    currentPage: result?.data?.currentPage ?? page,
  };
};