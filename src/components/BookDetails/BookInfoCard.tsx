import {
  Rb_Image,
  Rb_Label,
  Rb_Text,
} from "@rentbook/rentbook-ui-lib";
import type { OrderBook } from "../../types/order";

interface BookInfoCardProps {
  book: OrderBook;
}

interface DetailRowProps {
  label: string;
  value?: string | number;
}

const DetailRow = ({ label, value }: DetailRowProps) => (
  <div className="grid grid-cols-[130px_1fr] items-center gap-4">
    <Rb_Label className="text-sm text-gray-500">
      {label}
    </Rb_Label>

    <Rb_Text
      variant="span"
      className="text-left font-semibold"
    >
      {value ?? "-"}
    </Rb_Text>
  </div>
);

const getStatusClasses = (status: OrderBook["status"]) => {
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

const BookInfoCard = ({ book }: BookInfoCardProps) => {
  return (
    <div className="h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex gap-6 max-md:flex-col">
        <div className="flex justify-center">
          <Rb_Image
            src={book.coverImage}
            alt={book.name}
            className="h-52 w-36 rounded-lg object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-4 max-md:flex-col">
            <div>
              <Rb_Text variant="h3" className="font-semibold">
                {book.name}
              </Rb_Text>

              <Rb_Text
                variant="p"
                className="mt-1 text-gray-600"
              >
                {book.author}
              </Rb_Text>
            </div>

            <span
              className={`shrink-0 rounded-full px-4 py-1 text-sm font-semibold ${getStatusClasses(
                book.status
              )}`}
            >
              {book.status}
            </span>
          </div>

          <div className="mt-6 space-y-3">
            <DetailRow label="Book ID" value={book._id} />
            <DetailRow label="Publisher" value={book.publisher} />
            <DetailRow label="Category" value={book.category} />
            <DetailRow label="Language" value={book.language} />
            <DetailRow label="ISBN" value={book.isbn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfoCard;