import BookOverview from "../components/BookDetails/BookOverview";
import OtherBooks from "../components/BookDetails/OtherBooks";
import RatingAndReview from "../components/BookDetails/RatingAndReview";
import { useOrderBookDetails } from "../hooks/useOrderBookDetails";
import { useOrderDetails } from "../hooks/useOrderDetails";
import ShippingAddressCard from "../components/BookDetails/ShippingAddressCard";
import HelpSection from "../components/orderDetails/HelpSection";
import { Rb_LoadingSpinner } from "@rentbook/rentbook-ui-lib";

function OrderBookDetails() {
  // const params = new URLSearchParams(window.location.search);

  // const orderId = params.get("orderId") ?? "";
  // const bookId = params.get("bookId") ?? "";
  const params = new URLSearchParams(window.location.search);
const ORDER_ID = params.get("orderId") ?? "";
const BOOK_ID = params.get("bookId") ?? "";
  const { data: bookDetailsData, isLoading: isBookLoading, isError: isBookError, error: bookError } = useOrderBookDetails(ORDER_ID, BOOK_ID);
  const orderBook = bookDetailsData?.data;

  const { data: orderDetailsData, isLoading: isOrderLoading, isError: isOrderError, error: orderError,} = useOrderDetails(ORDER_ID);
  const orderItems = orderDetailsData?.data.items ?? [];

  if ( isBookLoading || isOrderLoading ) {
    return <Rb_LoadingSpinner />;
  }

  if ( isBookError || isOrderError || !orderBook ) {
     return (
      <div>
        {(bookError as Error)?.message ||
          (orderError as Error)?.message}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      {/* Top Section */}
      <BookOverview
        book={orderBook}
        // address={orderBook.shippingAddress}
      />
      {/* Bottom Section */}
      <div className="mt-6 grid grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-8 space-y-6 max-lg:col-span-12">
          {/* {hasOtherBooks && (
            <OtherBooks
              books={mockOrderDetails.books}
              selectedBookId={selectedBook._id}
            />
          )} */}
          <OtherBooks
            books={orderItems}
            selectedBookId={BOOK_ID}
            orderId={ORDER_ID}
          />
          <RatingAndReview />
        </div>

        {/* Right Column */}
        <div className="col-span-4 space-y-6 max-lg:col-span-12">
          <ShippingAddressCard address={orderBook.shippingAddress} />
          <HelpSection />
        </div>
      </div>
    </div>
  );
}

export default OrderBookDetails;