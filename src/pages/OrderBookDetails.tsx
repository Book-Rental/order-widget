import BookOverview from "../components/BookDetails/BookOverview";
import OtherBooks from "../components/BookDetails/OtherBooks";
import RatingAndReview from "../components/BookDetails/RatingAndReview";
import { useOrderBookDetails } from "../hooks/useOrderBookDetails";
import { useOrderDetails } from "../hooks/useOrderDetails";
import ShippingAddressCard from "../components/BookDetails/ShippingAddressCard";
import HelpSection from "../components/orderDetails/HelpSection";
import { Rb_LoadingSpinner } from "@rentbook/rentbook-ui-lib";
import RentalPeriodNotification from "../components/BookDetails/RentalPeriodNotification";
import { useShipmentStatusByAwb } from "../hooks/useShipmentStatusByAwb";

function OrderBookDetails() {
  const params = new URLSearchParams(window.location.search);

  const ORDER_ID = params.get("orderId") ?? "";
  const BOOK_ID = params.get("bookId") ?? "";

  const {
    data: bookDetailsData,
    isLoading: isBookLoading,
    isError: isBookError,
    error: bookError,
  } = useOrderBookDetails(ORDER_ID, BOOK_ID);

  const orderBook = bookDetailsData?.data;

  const {
    data: orderDetailsData,
    isLoading: isOrderLoading,
    isError: isOrderError,
    error: orderError,
  } = useOrderDetails(ORDER_ID);

  const order = orderDetailsData?.data;

  const orderItems = order?.items ?? [];

  const returnAwbNumber = orderBook?.shipmentDetails?.find(
    (shipment) => shipment.shipmentType === "Return"
  )?.awbNumber;

  const isPastReturnRequested =
    orderBook?.itemStatus === "return_in_progress" ||
    orderBook?.itemStatus === "returned";

  const { data: shipmentStatusData } =
    useShipmentStatusByAwb(
      returnAwbNumber,
      isPastReturnRequested
    );

  const pickupAgent = shipmentStatusData?.data.pickupAgent;

  if (isBookLoading || isOrderLoading) {
    return <Rb_LoadingSpinner />;
  }

  if (
    isBookError ||
    isOrderError ||
    !orderBook ||
    !order
  ) {
    return (
      <div>
        {(bookError as Error)?.message ||
          (orderError as Error)?.message ||
          "Failed to load order details."}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      {/* Book Overview */}
      <BookOverview
  book={orderBook}
  orderId={ORDER_ID}
  orderType={order.orderType}
  amount={order.amount}
/>

      <div className="mt-6 grid grid-cols-12 gap-6">
        {/* Left */}
        <div className="col-span-8 space-y-6 max-lg:col-span-12">
          <OtherBooks
            books={orderItems}
            selectedBookId={BOOK_ID}
            orderId={ORDER_ID}
            orderType={order.orderType}
          />

          <RatingAndReview />
        </div>

        {/* Right */}
       {/* Right */}
<div className="col-span-4 space-y-6 max-lg:col-span-12">
  {order.orderType === "rent" &&
    orderBook.rental &&
    (orderBook.itemStatus === "delivered" ||
      orderBook.itemStatus === "return_in_progress" ||
      orderBook.itemStatus === "returned") && (
      <RentalPeriodNotification
        rentStartDate={orderBook.rental.rentStartDate}
        expectedReturnDate={orderBook.rental.expectedReturnDate}
        pickupAgentName={pickupAgent?.fullName}
        pickupAgentPhone={pickupAgent?.phone}
      />
    )}

  <ShippingAddressCard
    address={orderBook.shippingAddress}
  />

  <HelpSection />
</div>
      </div>
    </div>
  );
}

export default OrderBookDetails;