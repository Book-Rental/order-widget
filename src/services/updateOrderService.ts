const API_URL = import.meta.env.VITE_API_URL;

interface UpdateOrderRequest {
  items: {
    _id: string;
    itemStatus: string;
  }[];
}

export const updateOrder = async (
  orderId: string,
  payload: UpdateOrderRequest
) => {
  const response = await fetch(
    `${API_URL}/api/order/update/${orderId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update order.");
  }

  return response.json();
};