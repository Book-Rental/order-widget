import { useQuery } from "@tanstack/react-query";
import { getShipmentStatusByAwb } from "../services/shipmentAgentStatusService";

export const useShipmentStatusByAwb = (
  awbNumber?: string,
  enabled = true
) => {
  return useQuery({
    queryKey: ["shipmentStatusByAwb", awbNumber],
    queryFn: () => getShipmentStatusByAwb(awbNumber!),
    enabled: !!awbNumber && enabled,
  });
};