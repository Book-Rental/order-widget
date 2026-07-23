import { Rb_Image, Rb_Text } from "@rentbook/rentbook-ui-lib";
import type { OrderBookDetails } from "../../types/orderedBookDetalils";
import OrderStatusBadge from "../OrderHistory/OrderStatusBadge";

interface BookInfoCardProps {
  book: OrderBookDetails;
}

const BookInfoCard = ({ book }: BookInfoCardProps) => {
  const detailRows = [
    // {
    //   key: "publisher",
    //   label: "Publisher",
    //   value: book.publisher,
    // },
    // {
    //   key: "isbn",
    //   label: "ISBN",
    //   value: book.isbn,
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

        <div className="mx-auto flex w-32 flex-shrink-0 items-start justify-center sm:mx-0">
          <Rb_Image
            src={book.book.coverImage}
            alt={book.book.name}
            shape="rounded"
            className="h-44 w-32 border"
          />
        </div>

        <div className="min-w-[240px] flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2 max-sm:justify-center max-sm:text-center">
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

          <div className="mt-5 grid grid-cols-[140px_minmax(0,1fr)] gap-x-4 gap-y-3">
            {detailRows.map((row) => (
              <div className="contents" key={row.key}>
                <Rb_Text className="text-left text-gray-500">
                  {row.label}
                </Rb_Text>

                <Rb_Text className="text-left font-semibold">
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