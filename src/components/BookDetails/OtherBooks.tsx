import {
  Rb_Button,
  Rb_Image,
  Rb_Text,
} from "@rentbook/rentbook-ui-lib";
import type { OrderBook } from "../../types/order";

interface OtherBooksProps {
  books: OrderBook[];
  selectedBookId: string;
  onViewDetails?: (bookId: string) => void;
}

const getStatusBadgeClasses = (status: OrderBook["status"]) => {
  switch (status) {
    case "CONFIRMED":
      return "bg-yellow-100 text-yellow-700";

    case "SHIPPED":
      return "bg-blue-100 text-blue-700";

    case "DELIVERED":
      return "bg-green-100 text-green-700";

    case "RETURNED":
      return "bg-gray-200 text-gray-700";

    case "CANCELLED":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

const OtherBooks = ({
  books,
  selectedBookId,
  onViewDetails,
}: OtherBooksProps) => {
  const otherBooks = books.filter(
    (book) => book._id !== selectedBookId
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
                src={book.coverImage}
                alt={book.name}
                className="h-20 w-14 rounded object-cover"
              />

              <div>
                <Rb_Text
                  variant="h6"
                  className="font-semibold"
                >
                  {book.name}
                </Rb_Text>

                <Rb_Text
                  variant="small"
                  className="mt-1 block text-gray-500"
                >
                  {book.author}
                </Rb_Text>

                <Rb_Text
                  variant="small"
                  className="mt-1 block text-gray-500"
                >
                  {book._id} · ₹{book.rentalPrice} / {book.rentalDuration}
                </Rb_Text>
              </div>
            </div>

            <div className="flex items-center gap-4 max-md:w-full max-md:justify-between">
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClasses(
                  book.status
                )}`}
              >
                {book.status}
              </span>

              <Rb_Button
                variant="outline"
                onClick={() => onViewDetails?.(book._id)}
              >
                View Details
              </Rb_Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherBooks;