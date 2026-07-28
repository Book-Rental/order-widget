import { Rb_Button, Rb_Label, Rb_Text } from "@rentbook/rentbook-ui-lib";
import type { OrderBookDetails } from "../../types/orderedBookDetalils";
import { useState } from "react";
import { useUpdateOrder } from "../../hooks/useUpdateOrder";
import ConfirmCancelModal from "../ConfirmCancelModal";
import { showToast } from "../../utils/toast";

interface RentalSummaryProps {
  book: OrderBookDetails;
  orderId: string;
}

const getActionButton = (status: OrderBookDetails["itemStatus"]) => {
  switch (status) {
    case "pending":
      return "Cancel the book";
    case "confirmed":
      return "Cancel the book";

    case "shipped":
      return "Track the book";

    case "delivered":
      return "Extend Rental";

    case "returned":
      return "Rent Again";

    case "cancelled":
      return "Rent Again";

    default:
      return "";
  }
};

const formatDate = (date: string | null) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

interface SummaryRowProps {
  label: string;
  value: string;
  badgeClassName?: string;
}

const SummaryRow = ({ label, value, badgeClassName }: SummaryRowProps) => (
  <div className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
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

const RentalSummary = ({ book , orderId  }: RentalSummaryProps) => {
  const updateOrderMutation = useUpdateOrder();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const handleConfirmCancel = () => {
    updateOrderMutation.mutate(
      {
        orderId,
        payload: {
          items: [
            {
              _id: book.orderItemId,
              itemStatus: "cancelled",
            },
          ],
        },
      },
      {
        onSuccess: () => {
          setShowCancelModal(false);
          showToast(
            "Book cancelled successfully.",
            "success"
          );
        },
        onError: (error) => {
          showToast(
            error instanceof Error
              ? error.message
              : "Failed to cancel book.",
            "error"
          );
        },
      }
    );
  };

  const handleActionClick = () => {
    switch (book.itemStatus) {
      case "pending":
      case "confirmed":
        setShowCancelModal(true);
        break;

      case "shipped":
        // TODO: Track Order
        break;

      case "delivered":
        // TODO: Extend Rental
        break;

      case "returned":
      case "cancelled":
        // TODO: Rent Again
        break;
    }
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <Rb_Text variant="h4" className="mb-6">
        Rental Summary
      </Rb_Text>

      <div className="space-y-4">
        <SummaryRow
          label="Rental Start"
          value={formatDate(book.rental.rentStartDate)}
        />
        <SummaryRow
          label="Rental End"
          value={formatDate(book.rental.expectedReturnDate)}
        />
        <SummaryRow
          label="Rental Duration"
          value={`${book.rental.rentalDuration} Days`}
        />
        <SummaryRow
          label="Rental Price"
          value={`₹${book.rental.rentalPrice}`}
        />
        <SummaryRow
          label="Security Deposit"
          value={`₹${book.rental.securityDeposit}`}
        />

        <SummaryRow
          label="Payment Method"
          value={book.payment.paymentMethod}
        />
      </div>

      <div className="mt-auto pt-8">
        <Rb_Button 
          variant="primary" 
          onClick={handleActionClick} 
          disabled={updateOrderMutation.isPending || book.itemStatus === "cancelled"}
          className="w-full">
          {getActionButton(book.itemStatus)}
        </Rb_Button>
      </div>
      <ConfirmCancelModal
        open={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleConfirmCancel}
        loading={updateOrderMutation.isPending}
      />
    </div>
  );
};

export default RentalSummary;