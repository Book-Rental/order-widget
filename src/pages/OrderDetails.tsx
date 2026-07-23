import { Rb_LoadingSpinner, Rb_Text } from "@rentbook/rentbook-ui-lib";

import { useOrderDetails } from "../hooks/useOrderDetails";
import OrderInformation from "../components/orderDetails/OrderInformation";
import BookCard from "../components/orderDetails/BookCard";
import OrderHeader from "../components/orderDetails/OrderHeader";
import HelpSection from "../components/orderDetails/HelpSection";


const OrderDetails = () => {
  const params = new URLSearchParams(window.location.search);
  const ORDER_ID = params.get("orderId") ?? "";
  const { data, isLoading, isError, error } = useOrderDetails(ORDER_ID);
  const order = data?.data;

  if (isLoading) {
    return <Rb_LoadingSpinner />
  }

  if (isError || !order) {
    return <div>{(error as Error)?.message}</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <OrderHeader
        orderNumber={order.orderNumber}
        createdAt={order.createdAt}
        orderStatus={order.orderStatus}
      />

      <OrderInformation order={order} />

      <div className="mt-8">
        <Rb_Text variant="h4" className="mb-5 text-center">
          Books in this Order ({order.items?.length ?? 0})
        </Rb_Text>

        <div className="space-y-6">
          {order.items?.map((book)=> (
            <BookCard
              key={book._id}
              book={book}
              orderId={order._id}
            />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <HelpSection />
      </div>
    </div>
  );
};

export default OrderDetails;