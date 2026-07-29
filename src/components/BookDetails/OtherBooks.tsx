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

  const otherBooksScrollbarHideStyle = `
    .other-books-scroll::-webkit-scrollbar {
      display: none;
    }

    .other-books-scroll {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <style>{otherBooksScrollbarHideStyle}</style>

      <Rb_Text
        variant="h4"
        className="mb-6 text-base font-semibold leading-6 text-gray-900"
      >
        Other Books in this Order
      </Rb_Text>

      <div
        className={`space-y-4 ${
          otherBooks.length > 2
            ? "other-books-scroll max-h-[320px] overflow-y-auto pr-2"
            : ""
        }`}
      >
        {otherBooks.map((book) => (
          <div
            key={book._id}
            className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <Rb_Image
                src={book.bookId.coverImage}
                alt={book.bookId.name}
                shape="rounded"
                className="h-20 w-14 border !object-contain"
              />

              <div className="min-w-0">
                <Rb_Text
                  variant="h6"
                  className="truncate text-base leading-6 text-gray-900"
                >
                  {book.bookId.name}
                </Rb_Text>

                <Rb_Text className="mt-1 text-sm leading-5 text-gray-600">
                  {book.bookId.author}
                </Rb_Text>

                <Rb_Text className="mt-1 text-sm leading-5 text-gray-600">
                  ₹{book.rental.rentalPrice} / {book.rental.rentalDuration} Days
                </Rb_Text>
              </div>
            </div>

            <div className="w-full sm:w-auto">
              <Rb_Button
                variant="primary"
                className="w-full sm:w-auto"
                onClick={() => {
                  window.history.pushState(
                    {},
                    "",
                    `/order-details?orderId=${orderId}&bookId=${book.bookId._id}`
                  );

                  window.dispatchEvent(new PopStateEvent("popstate"));
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