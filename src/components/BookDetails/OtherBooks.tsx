import { Rb_Button, Rb_Image, Rb_Text } from "@rentbook/rentbook-ui-lib";
import type { OrderItem } from "../../types/order";


interface OtherBooksProps {
  books: OrderItem[];
  selectedBookId: string;
  orderId: string;
}

const OtherBooks = ({
  books,
  selectedBookId,
  orderId,
}: OtherBooksProps) => {
  const otherBooks = books.filter(
    (book) => book.bookId._id !== selectedBookId
  );

  if (!otherBooks.length) {
    return null;
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <Rb_Text
        variant="h4"
        className="mb-6"
      >
        Other Books in this Order
      </Rb_Text>

      <div className="space-y-4">
        {otherBooks.map((book) => (
          <div
            key={book._id}
            className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 p-4 max-md:flex-col max-md:items-start"
          >
            <div className="flex items-center gap-4">
              <Rb_Image
                src={book.bookId.coverImage}
                alt={book.bookId.name}
                className="h-20 w-14 rounded object-cover"
              />

              <div>
                <Rb_Text
                  variant="h6"
                  className="text-left font-semibold"
                >
                  {book.bookId.name}
                </Rb_Text>

                <Rb_Text
                  variant="small"
                  className="mt-1  text-left block text-gray-500"
                >
                  {book.bookId.author}
                </Rb_Text>

                <Rb_Text
                  variant="small"
                  className="mt-1 text-left block text-gray-500"
                >
                   ₹{book.rental.rentalPrice} / {book.rental.rentalDuration} Days
                </Rb_Text>
              </div>
            </div>

            <div className="flex items-center gap-4 max-md:w-full max-md:justify-between">
              <Rb_Button
              variant="outline"
              onClick={() => {
                window.history.pushState(
                  {},
                  "",
                  `/order-details?orderId=${orderId}&bookId=${book.bookId._id}`
                );

                window.dispatchEvent(
                  new PopStateEvent("popstate")
                );
              }}
            >
              More Details
            </Rb_Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherBooks;