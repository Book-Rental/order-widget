import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrder } from "../services/updateOrderService";

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orderId,
      payload,
    }: {
      orderId: string;
      payload: {
        items: {
          _id: string;
          itemStatus: string;
        }[];
      };
    }) => updateOrder(orderId, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["orderDetails", variables.orderId],
      });

      queryClient.invalidateQueries({
        queryKey: ["orderBookDetails"],
      });
    },
  });
};