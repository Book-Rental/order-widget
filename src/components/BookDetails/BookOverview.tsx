import BookInfoCard from "./BookInfoCard";
import RentalSummary from "./RentalSummary";
import RentalJourney from "./RentalJourney";
import type { OrderBookDetails } from "../../types/orderedBookDetalils";

interface BookOverviewProps {
  book: OrderBookDetails;
  orderId: string;
  orderType: "rent" | "auction";
  amount: {
    itemAmount: number;
    rentalAmount: number;
    securityDeposit: number;
    deliveryFee: number;
    discount: number;
    tax: number;
    totalAmount: number;
    refundAmount: number;
  };
}

function BookOverview({
  book,
  orderId,
  orderType,
  amount,
}: BookOverviewProps) {
  return (
    <div className="grid grid-cols-12 items-stretch gap-6">
      <div className="col-span-8 flex flex-col gap-6 max-lg:col-span-12">
        <BookInfoCard
          book={book}
          orderType={orderType}
        />

        <RentalJourney status={book.itemStatus} />
      </div>

      <div className="col-span-4 max-lg:col-span-12">
        <RentalSummary
          book={book}
          orderId={orderId}
          orderType={orderType}
          amount={amount}
        />
      </div>
    </div>
  );
}

export default BookOverview;