import type { ShipmentStatusResponse } from "../types/orderedBookDetalils";

const ADMIN_URL = import.meta.env.VITE_ADMIN_URL;

export const getShipmentStatusByAwb = async (
  awbNumber: string
): Promise<ShipmentStatusResponse> => {
  const response = await fetch(
    `${ADMIN_URL}/api/shipment/shipmentStatuse/${awbNumber}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch shipment status.");
  }

  return response.json();
};