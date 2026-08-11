import { Order } from "../types/orderHistory";

const API_URL = import.meta.env.VITE_API_URL;

export interface OrdersResponse {
  orders: Order[];
    meta: {
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    limit: number;
    hasMore: boolean;
  };
}

export const getOrdersByUserId = async (
  userId: string,
  page: number
): Promise<OrdersResponse> => {
  const response = await fetch(
    `${API_URL}/api/order/getByUserId/${userId}?page=${page}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  const result = await response.json();

  return {
    orders: result?.data?.orders ?? [],
     meta: {
      totalRecords: result?.data?.meta?.totalRecords ?? 0,
      totalPages: result?.data?.meta?.totalPages ?? 1,
      currentPage: result?.data?.meta?.currentPage ?? page,
      limit: result?.data?.meta?.limit ?? 10,
      hasMore: result?.data?.meta?.hasMore ?? false,
    },
  };
};