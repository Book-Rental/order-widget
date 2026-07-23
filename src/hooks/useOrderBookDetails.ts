import { useQuery } from "@tanstack/react-query";
import { getOrderBookDetails } from "../services/orderBookDetailsService";

export const useOrderBookDetails = (
  orderId: string,
  bookId: string
) => {
  return useQuery({
    queryKey: ["orderBookDetails", orderId, bookId],
    queryFn: () => getOrderBookDetails(orderId, bookId),
    enabled: !!orderId && !!bookId,
  });
};