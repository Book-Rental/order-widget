import { Rb_Image, Rb_Text } from "@rentbook/rentbook-ui-lib";
import type { OrderBookDetails } from "../../types/orderedBookDetalils";
import OrderStatusBadge from "../OrderHistory/OrderStatusBadge";

interface BookInfoCardProps {
  book: OrderBookDetails;
}

const BookInfoCard = ({ book }: BookInfoCardProps) => {
  const detailRows = [
    {
      key: "author",
      label: "Author",
      value: book.book.author,
    },
    {
      key: "edition",
      label: "Edition",
      value: book.book.edition,
    },
    {
      key: "category",
      label: "Category",
      value: book.book.category,
    },
    {
      key: "language",
      label: "Language",
      value: book.book.language,
    },
  ];

  return (
    <div className="h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row">
        {/* Book Image */}
        <div className="mx-auto flex w-28 shrink-0 items-start justify-center sm:mx-0 sm:w-32 sm:justify-start">
          <Rb_Image
            src={book.book.coverImage}
            alt={book.book.name}
            shape="rounded"
            className="h-40 w-28 border !object-contain sm:h-44 sm:w-32"
          />
        </div>

        {/* Book Information */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <Rb_Text
              variant="h6"
              className="min-w-0 text-base leading-6 text-gray-900"
            >
              {book.book.name}
            </Rb_Text>

            <div className="shrink-0">
              <OrderStatusBadge status={book.itemStatus} />
            </div>
          </div>

          {/* Book Details */}
          <div className="mt-4 space-y-3">
            {detailRows.map((row) => (
              <div
                key={row.key}
                className="flex items-start justify-between gap-4 border-b border-gray-100 pb-2 last:border-b-0 last:pb-0"
              >
                <Rb_Text className="shrink-0 text-sm leading-5 text-gray-600">
                  {row.label}
                </Rb_Text>

                <Rb_Text className="min-w-0 text-right text-sm leading-5 text-gray-900">
                  {row.value || "-"}
                </Rb_Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfoCard;