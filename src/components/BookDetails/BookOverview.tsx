import BookInfoCard from "./BookInfoCard";
import RentalSummary from "./RentalSummary";
import RentalJourney from "./RentalJourney";
import type { OrderBookDetails } from "../../types/orderedBookDetalils";

interface BookOverviewProps {
  book: OrderBookDetails;
}

function BookOverview({ book }: BookOverviewProps) {
  return (
    <div className="grid grid-cols-12 items-stretch gap-6">
      <div className="col-span-8 flex flex-col gap-6 max-lg:col-span-12">
        <BookInfoCard book={book} />
        <RentalJourney status={book.itemStatus} />
      </div>

      <div className="col-span-4 max-lg:col-span-12">
        <RentalSummary book={book} />
      </div>
    </div>
  );
}

export default BookOverview;