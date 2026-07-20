import { Rb_Text } from "@rentbook/rentbook-ui-lib";
import { mockOrderDetails } from "../mock/orderDetails";
import OrderHeader from "../components/orderDetails/OrderHeader";
import OrderInformation from "../components/orderDetails/OrderInformation";
import HelpSection from "../components/orderDetails/HelpSection";
import BookCard from "../components/orderDetails/BookCard";

const OrderDetails = () => {
  const order = mockOrderDetails;

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <OrderHeader
        orderId={order.orderId}
        orderDate={order.orderDate}
        orderStatus={order.orderStatus}
      />

      <OrderInformation
        shippingAddress={order.shippingAddress}
        payment={order.payment}
        priceSummary={order.priceSummary}
      />

      <div className="mt-8">
        <Rb_Text variant="h4" className="mb-5">
          Books in this Order ({order.books.length})
        </Rb_Text>

        <div className="space-y-6">
          {order.books.map((book) => (
            <BookCard key={book._id} book={book} />
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