import { Rb_LoadingSpinner, Rb_Text } from "@rentbook/rentbook-ui-lib";

import { useQuery } from "@tanstack/react-query";
import OrderCard from "../../components/OrderHistory/OrderCard";
import EmptyOrders from "../../components/OrderHistory/EmptyOrders";
import { getOrdersByUserId } from "../../services/OrderHistoryService";

export default function OrderHistory() {
  // const userId = "6a478a2b85d2cac23d46a822";
  const userId = window.HOST_USER_INFO?._id ?? "";

  const {
    data: orders = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["orders", userId],
    queryFn: () => getOrdersByUserId(userId),
  });

  if (isPending) return <Rb_LoadingSpinner />;

  if (error) return <Rb_Text>Failed loading orders</Rb_Text>;

  const redirectToCategory = () => {
    window.history.pushState({}, "", `/books`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  if (!orders.length) {
    return <EmptyOrders onBrowse={redirectToCategory} />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Rb_Text variant="h3">My Orders</Rb_Text>
      <div className="space-y-5 mt-5">
        {orders.map((order) => (
          <OrderCard
            key={order.orderId}
            order={order}
            onDetails={(orderId, bookId) => {
              const params = new URLSearchParams({
                orderId,
              });

              if (bookId) {
                params.append("bookId", bookId);
              }
              window.history.pushState({}, "", `/order-details?${params.toString()}`);

              window.dispatchEvent(new PopStateEvent("popstate"));
            }}
            onPdp={(id) => {
              window.history.pushState({}, "", `/books-details?bookId=${id}`);

              window.dispatchEvent(new PopStateEvent("popstate"));
            }}
          />
        ))}
      </div>
    </div>
  );
}

