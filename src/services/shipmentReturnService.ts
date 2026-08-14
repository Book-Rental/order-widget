const ADMIN_URL = import.meta.env.VITE_ADMIN_URL;

export const markShipmentReadyForPickup = async (
  shipmentId: string
) => {
  const response = await fetch(
    `${ADMIN_URL}/api/shipment/order-item/${shipmentId}/ready-for-pickup`,
    {
      method: "PATCH",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to mark shipment ready for pickup."
    );
  }

  return response.json();
};