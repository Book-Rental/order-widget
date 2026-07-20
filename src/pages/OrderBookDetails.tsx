import BookOverview from "../components/BookDetails/BookOverview";
import OtherBooks from "../components/BookDetails/OtherBooks";
import RentalJourney from "../components/BookDetails/RentalJourney";
import RatingAndReview from "../components/BookDetails/RatingAndReview";
import HelpSection from "../components/orderDetails/HelpSection";

import { mockOrderDetails } from "../mock/orderDetails";

const selectedBook = mockOrderDetails.books[0];

function OrderBookDetails() {
  const hasOtherBooks = mockOrderDetails.books.some(
    (book) => book._id !== selectedBook._id
  );

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      {/* Top Section */}
      <BookOverview
        book={selectedBook}
        address={mockOrderDetails.shippingAddress}
      />

      {/* Rental Journey */}
      <div className="mt-6">
        <RentalJourney status={selectedBook.status} />
      </div>

      {/* Bottom Section */}
      <div className="mt-6 grid grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-8 space-y-6 max-lg:col-span-12">
          {hasOtherBooks && (
            <OtherBooks
              books={mockOrderDetails.books}
              selectedBookId={selectedBook._id}
            />
          )}

          <RatingAndReview />
        </div>

        {/* Right Column */}
        <div className="col-span-4 max-lg:col-span-12">
          <HelpSection />
        </div>
      </div>
    </div>
  );
}

export default OrderBookDetails;