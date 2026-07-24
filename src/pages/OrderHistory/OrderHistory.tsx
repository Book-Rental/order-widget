import { useState } from "react";
import {
  Pagination,
  Rb_LoadingSpinner,
  Rb_Text,
} from "@rentbook/rentbook-ui-lib";
import { useQuery } from "@tanstack/react-query";

import OrderCard from "../../components/OrderHistory/OrderCard";
import EmptyOrders from "../../components/OrderHistory/EmptyOrders";
import { getOrdersByUserId } from "../../services/OrderHistoryService";

export default function OrderHistory() {
  const userId = window.HOST_USER_INFO?._id ?? "";

  const [page, setPage] = useState(1);

  const {
    data,
    isPending,
    error,
  } = useQuery({
    queryKey: ["orders", userId, page],
    queryFn: () => getOrdersByUserId(userId, page),
  });

  if (isPending) return <Rb_LoadingSpinner />;

  if (error) return <Rb_Text>Failed loading orders</Rb_Text>;

  const orders = data?.orders ?? [];
  const totalPages = data?.totalPages ?? 1;

  const redirectToCategory = () => {
    window.history.pushState({}, "", "/books");
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
              const params = new URLSearchParams({ orderId });

              if (bookId) {
                params.append("bookId", bookId);
              }

              window.history.pushState(
                {},
                "",
                `/order-details?${params.toString()}`
              );

              window.dispatchEvent(new PopStateEvent("popstate"));
            }}
            onPdp={(id) => {
              window.history.pushState(
                {},
                "",
                `/books-details?bookId=${id}`
              );

              window.dispatchEvent(new PopStateEvent("popstate"));
            }}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}