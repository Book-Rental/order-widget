import { Rb_Button, Rb_Image, Rb_Text } from "@rentbook/rentbook-ui-lib";
import { OrderBook } from "../../types/order";


interface BookCardProps {
  book: OrderBook;
}

const STATUS_CONFIG = {
  CONFIRMED: {
    label: "Confirmed",
    badge: "bg-blue-100 text-blue-700",
  },
  SHIPPED: {
    label: "Shipped",
    badge: "bg-yellow-100 text-yellow-700",
  },
  DELIVERED: {
    label: "Delivered",
    badge: "bg-green-100 text-green-700",
  },
  RETURNED: {
    label: "Returned",
    badge: "bg-gray-100 text-gray-700",
  },
  CANCELLED: {
    label: "Cancelled",
    badge: "bg-red-100 text-red-700",
  },
};

const BookCard = ({ book }: BookCardProps) => {
  const status = STATUS_CONFIG[book.status];

  const getDateInfo = () => {
    switch (book.status) {
      case "CONFIRMED":
      case "SHIPPED":
        return {
          label: "Estimated Delivery",
          value: book.estimatedDeliveryDate,
        };

      case "DELIVERED":
        return {
          label: "Delivered On",
          value: book.deliveredDate,
        };

      case "RETURNED":
        return {
          label: "Returned On",
          value: book.returnedDate,
        };

      case "CANCELLED":
        return {
          label: "Cancelled On",
          value: book.cancelledDate,
        };

      default:
        return {
          label: "",
          value: "",
        };
    }
  };

  const dateInfo = getDateInfo();

  // Book identity rows (name + author) shown with labels, above the rental details
  const identityRows = [
    { key: "book", label: "Book", value: book.name },
    { key: "author", label: "Author", value: book.author },
  ];

  // Rental detail rows — date info now lives in the top strip, so it's excluded here
  const detailRows = [
    { key: "duration", label: "Rental Duration", value: book.rentalDuration },
    {
      key: "period",
      label: "Rental Period",
      value: `${book.rentalStartDate || "-"} → ${book.rentalEndDate || "-"}`,
    },
    { key: "price", label: "Rental Price", value: `₹${book.rentalPrice}` },
    {
      key: "deposit",
      label: "Security Deposit",
      value: `₹${book.securityDeposit}`,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      {/* Top strip: date info + status badge */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <Rb_Text className="text-gray-500">{dateInfo.label}</Rb_Text>
          <Rb_Text>{dateInfo.value || "-"}</Rb_Text>
        </div>

        <span
          className={`shrink-0 rounded-full px-4 py-1 text-sm font-medium ${status.badge}`}
        >
          {status.label}
        </span>
      </div>

      <div className="flex items-end gap-5">
        {/* Image */}
        <div className="flex w-32 flex-shrink-0 items-center justify-center self-start">
          <Rb_Image
            src={book.coverImage}
            alt={book.name}
            shape="rounded"
            className="h-44 w-32 border"
          />
        </div>

        {/* Right Section */}
        <div className="flex flex-1 items-end justify-between gap-6">
          {/* Book identity + rental details */}
          <div className="grid grid-cols-[140px_1fr] gap-x-4 gap-y-2">
            {identityRows.map((row) => (
              <div className="contents" key={row.key}>
                <Rb_Text className="text-left text-gray-500">
                  {row.label}
                </Rb_Text>
                <Rb_Text className="text-left font-semibold">
                  {row.value}
                </Rb_Text>
              </div>
            ))}

            {detailRows.map((row) => (
              <div className="contents" key={row.key}>
                <Rb_Text className="text-left text-gray-500">
                  {row.label}
                </Rb_Text>
                <Rb_Text className="text-left">{row.value}</Rb_Text>
              </div>
            ))}
          </div>
          {/* Buttons */}
          <div className="flex w-40 shrink-0 flex-col gap-2">
            {book.status === "CONFIRMED" && (
              <Rb_Button variant="secondary">Cancel Order</Rb_Button>
            )}

            {book.status === "SHIPPED" && <Rb_Button>Track Order</Rb_Button>}

            {book.status === "DELIVERED" && (
              <Rb_Button>Extend Duration</Rb_Button>
            )}

            {(book.status === "RETURNED" ||
              book.status === "CANCELLED") && (
              <Rb_Button>Rent Again</Rb_Button>
            )}

            <Rb_Button variant="secondary">More Details</Rb_Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;