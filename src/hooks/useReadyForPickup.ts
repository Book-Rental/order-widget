import { useMutation } from "@tanstack/react-query";
import { markShipmentReadyForPickup } from "../services/shipmentReturnService";

export const useReadyForPickup = () => {
  return useMutation({
    mutationFn: (shipmentId: string) =>
      markShipmentReadyForPickup(shipmentId),
  });
};