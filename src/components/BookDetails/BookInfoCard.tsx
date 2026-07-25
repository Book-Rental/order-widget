import { Rb_Image, Rb_Text } from "@rentbook/rentbook-ui-lib";
import type { OrderBookDetails } from "../../types/orderedBookDetalils";
import OrderStatusBadge from "../OrderHistory/OrderStatusBadge";

interface BookInfoCardProps {
  book: OrderBookDetails;
}

const BookInfoCard = ({ book }: BookInfoCardProps) => {
  const detailRows = [
    // {
    //   key: "name",
    //   label: "Book",
    //   value: book.book.name,
    // },
    // {
    //   key: "author",
    //   label: "Author",
    //   value: book.book.author,
    // },
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
    }
  ];

  return (
    <div className="h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap gap-5">
        <div className="mx-auto flex w-32 flex-shrink-0 items-start justify-center sm:mx-0 sm:justify-start">
          <Rb_Image
            src={book.book.coverImage}
            alt={book.book.name}
            shape="rounded"
            className="h-44 w-32 border !object-contain"
          />
        </div>

        <div className="min-w-[240px] flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <Rb_Text variant="h6" className="font-semibold">
                {book.book.name}
              </Rb_Text>

              <Rb_Text className="mt-1 text-gray-500">
                {book.book.author}
              </Rb_Text>
            </div>
            <OrderStatusBadge status={book.itemStatus} />
          </div>
          {/* <div className="mb-4 flex justify-end">
            <OrderStatusBadge status={book.itemStatus} />
          </div> */}

          <div className="mt-4 space-y-3">
            {detailRows.map((row) => (
              <div 
                className="flex items-start justify-between gap-4 border-b border-gray-100 pb-2 last:border-b-0 last:pb-0" 
                key={row.key}
              >
                <Rb_Text className="shrink-0 text-gray-500">
                  {row.label}
                </Rb_Text>

                <Rb_Text className="text-right font-semibold">
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