import {
  Rb_Button,
  Rb_Label,
  Rb_Text,
} from "@rentbook/rentbook-ui-lib";
import type { OrderBook } from "../../types/order";

interface RentalSummaryProps {
  book: OrderBook;
}

const getActionButton = (status: OrderBook["status"]) => {
  switch (status) {
    case "CONFIRMED":
      return "Cancel Order";

    case "SHIPPED":
      return "Track Order";

    case "DELIVERED":
      return "Extend Rental";

    case "RETURNED":
      return "Rent Again";

    case "CANCELLED":
      return "Rent Again";

    default:
      return "";
  }
};

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

interface SummaryRowProps {
  label: string;
  value: string;
  badgeClassName?: string;
}

const SummaryRow = ({ label, value, badgeClassName }: SummaryRowProps) => (
  <div className=" h-full flex items-center justify-between border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
    <Rb_Label className="text-sm text-gray-500">
      {label}
    </Rb_Label>

    {badgeClassName ? (
      <span
        className={`rounded-full px-3 py-0.5 text-sm font-semibold ${badgeClassName}`}
      >
        {value}
      </span>
    ) : (
      <Rb_Text variant="span" className="font-semibold">
        {value}
      </Rb_Text>
    )}
  </div>
);

const RentalSummary = ({ book }: RentalSummaryProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <Rb_Text
        variant="h4"
        className="mb-6"
      >
        Rental Summary
      </Rb_Text>

      <div className="space-y-4">
        <SummaryRow
          label="Status"
          value={book.status}
          badgeClassName={getStatusBadgeClasses(book.status)}
        />

        <SummaryRow
          label="Rental Start"
          value={book.rentalStartDate ?? "-"}
        />

        <SummaryRow
          label="Rental End"
          value={book.rentalEndDate ?? "-"}
        />

        <SummaryRow
          label="Rental Duration"
          value={book.rentalDuration}
        />

        <SummaryRow
          label="Rental Price"
          value={`₹${book.rentalPrice}`}
        />

        <SummaryRow
          label="Security Deposit"
          value={`₹${book.securityDeposit}`}
        />
      </div>

      <div className="mt-8">
        <Rb_Button
          variant="primary"
          className="w-full"
        >
          {getActionButton(book.status)}
        </Rb_Button>
      </div>
    </div>
  );
};

export default RentalSummary;