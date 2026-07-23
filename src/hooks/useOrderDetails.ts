import { useQuery } from "@tanstack/react-query";
import { getOrderDetails } from "../services/orderService";

export const useOrderDetails = (orderId: string) => {
  return useQuery({
    queryKey: ["orderDetails", orderId],
    queryFn: () => getOrderDetails(orderId),
    enabled: !!orderId,
  });
};