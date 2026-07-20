import BookInfoCard from "./BookInfoCard";
import RentalSummary from "./RentalSummary";
import type { OrderBook, ShippingAddress } from "../../types/order";
import ShippingAddressCard from "./ShippingAddressCard";

interface BookOverviewProps {
  book: OrderBook;
  address: ShippingAddress;
}

function BookOverview({ book , address }: BookOverviewProps) {
  return (
    <div className="grid grid-cols-12 items-stretch gap-6">

      <div className="col-span-5 max-xl:col-span-12">
        <BookInfoCard book={book} />
      </div>

      <div className="col-span-3 max-xl:col-span-6">
        <RentalSummary book={book} />
      </div>

      <div className="col-span-4 max-xl:col-span-6">
        <ShippingAddressCard address={address} />
      </div>

    </div>
  );
}

export default BookOverview;