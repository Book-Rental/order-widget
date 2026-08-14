import { useState } from "react";
import { Rb_Button, Rb_Label, Rb_Text } from "@rentbook/rentbook-ui-lib";
import type { OrderBookDetails } from "../../types/orderedBookDetalils";
import { useUpdateOrder } from "../../hooks/useUpdateOrder";
import { showToast } from "../../utils/toast";
import RentalActionModal, { type RentalAction, type ExtensionOption,} from "../RentalActionModal";
import { useReadyForPickup } from "../../hooks/useReadyForPickup";
import { useQueryClient } from "@tanstack/react-query";


interface RentalSummaryProps {
  book: OrderBookDetails;
  orderId: string;
}

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

const SummaryRow = ({
  label,
  value,
  badgeClassName,
}: SummaryRowProps) => {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
      <Rb_Label className="text-sm leading-5 text-gray-600">
        {label}
      </Rb_Label>

      {badgeClassName ? (
        <span
          className={`rounded-full px-3 py-0.5 text-sm leading-5 ${badgeClassName}`}
        >
          {value}
        </span>
      ) : (
        <Rb_Text
          variant="span"
          className="text-right text-sm leading-5 text-gray-900"
        >
          {value}
        </Rb_Text>
      )}
    </div>
  );
};

const RentalSummary = ({
  book,
  orderId,
}: RentalSummaryProps) => {
  const updateOrderMutation = useUpdateOrder();
  const readyForPickupMutation = useReadyForPickup();
  const queryClient = useQueryClient();
  // const returnShipmentId = book.shipmentDetails?.find(
  //   (shipment) => shipment.shipmentType === "Return"
  // )?.shipmentId;

  const forwardShipment = book.shipmentDetails?.find(
    (shipment) => shipment.shipmentType === "Forward"
  );

  const returnShipment = book.shipmentDetails?.find(
    (shipment) => shipment.shipmentType === "Return"
  );
  const returnShipmentId = returnShipment?.shipmentId;
  const forwardAwbNumber = forwardShipment?.awbNumber;
  const returnAwbNumber = returnShipment?.awbNumber;

  // const [showCancelModal, setShowCancelModal] = useState(false);
  const [rentalAction, setRentalAction] = useState<RentalAction | null>(null);
  const extensionOptions: ExtensionOption[] = [
    {
      value: "day",
      label: "1 Day",
      price: 0,
    },
    {
      value: "week",
      label: "1 Week",
      price: 0,
    },
    {
      value: "month",
      label: "1 Month",
      price: 0,
    },
  ];

  // const redirectToTrackPage = () => {
  //   window.history.pushState({}, "", `/track-shipment/${book.orderItemId}`);
  //   window.dispatchEvent(new PopStateEvent("popstate"));
  // };

  const redirectToTrackPage = (awbNumber: string) => {
    window.history.pushState( {},"", `/track-shipment/${awbNumber}` );
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  

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
          setRentalAction(null);

          showToast(
            "Book cancelled successfully.",
            "success"
          );
        },

        onError: (error) => {
          setRentalAction(null);

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

  const handleConfirmReturn = () => {
    updateOrderMutation.mutate(
      {
        orderId,
        payload: {
          items: [
            {
              _id: book.orderItemId,
              itemStatus: "return_requested",
            },
          ],
        },
      },
      {
        onSuccess: () => {
          setRentalAction(null);
          showToast("Return request raised successfully.", "success");
        },
        onError: (error) => {
          setRentalAction(null);
          showToast(
            error instanceof Error ? error.message : "Failed to raise return request.",
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
        setRentalAction("cancel");
        break;

      case "shipped":
        // TODO: Track Order
        if (forwardAwbNumber) {
          redirectToTrackPage(forwardAwbNumber);
        } else {
          showToast("Forward shipment not found.", "error");
        }
        break;

      case "delivered":
        // TODO: Extend Rental
        break;

      case "returned":
      case "cancelled":
        // TODO: Rent Again
        break;

      default:
        break;
    }
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Heading */}
      <Rb_Text
        variant="h4"
        className="mb-6 text-base font-semibold leading-6 text-gray-900"
      >
        Rental Summary
      </Rb_Text>

      {/* Summary */}
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

      <div className="mt-auto flex flex-col gap-2 pt-8">
        {(book.itemStatus === "pending" ||
          book.itemStatus === "confirmed") && (
          <Rb_Button
            variant="secondary"
            onClick={() => setRentalAction("cancel")}
            disabled={updateOrderMutation.isPending}
            className="w-full"
          >
            Cancel the Book
          </Rb_Button>
        )}

        {book.itemStatus === "shipped" && (
          <Rb_Button
            variant="primary"
            onClick={handleActionClick}
            className="w-full"
          >
            Track the Book
          </Rb_Button>
        )}

        {book.itemStatus === "out_for_delivery" && (
          <div className="mt-2 flex items-center gap-3 rounded-lg border border-orange-100 bg-orange-50 px-4 py-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              🚚
            </span>

            <Rb_Text className="text-sm font-medium text-orange-800">
              Your book is out for delivery.
            </Rb_Text>
          </div>
        )}

        {book.itemStatus === "return_requested" && (
          <Rb_Button
            variant="primary"
            onClick={() => {
              if (!returnShipmentId) {
                showToast(
                  "Return shipment not found.",
                  "error"
                );
                return;
              }

              readyForPickupMutation.mutate(returnShipmentId, {
                onSuccess: async () => {
                  await queryClient.invalidateQueries({
                    queryKey: ["orderBookDetails"],
                  });

                  showToast(
                    "Return pickup request raised successfully.",
                    "success"
                  );
                },
                onError: (error) => {
                  showToast(
                    error instanceof Error
                      ? error.message
                      : "Failed to make return shipment ready for pickup.",
                    "error"
                  );
                },
              });
            }}
            disabled={
              readyForPickupMutation.isPending || !returnShipmentId
            }
            className="w-full"
          >
            {readyForPickupMutation.isPending
              ? "Processing..."
              : "Ready to Return Book"}
          </Rb_Button>
        )}

        {book.itemStatus === "return_in_progress" && (
          <Rb_Button
            variant="primary"
            onClick={() => {
              if (!returnAwbNumber) {
                showToast(
                  "Return shipment AWB not found.",
                  "error"
                );
                return;
              }

              redirectToTrackPage(returnAwbNumber);
            }}
            disabled={!returnAwbNumber}
            className="w-full"
          >
            Track Return
          </Rb_Button>
        )}

        {book.itemStatus === "returned" && (
          <div className="mt-2 flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600">
              ✓
            </span>

            <Rb_Text className="text-sm font-medium text-gray-700">
              This book has been returned.
            </Rb_Text>
          </div>
        )}

        {book.itemStatus === "delivered" && (
          <>
            {book.rental.extensionCount <
              book.rental.maximumExtensions && (
              <Rb_Button
                variant="primary"
                onClick={() => setRentalAction("extend")}
                className="w-full"
              >
                Extend Rental
              </Rb_Button>
            )}

            <Rb_Button
              variant="secondary"
              onClick={() => setRentalAction("return")}
              className="w-full"
            >
              Return Book
            </Rb_Button>
          </>
        )}

        {(
          book.itemStatus === "cancelled") && (
          <Rb_Button
            variant="primary"
            onClick={() => {
              // TODO: Rent Again
            }}
            className="w-full"
          >
            Rent Again
          </Rb_Button>
        )}
      </div>

      {/* Cancel Modal */}
      <RentalActionModal
        open={rentalAction !== null}
        action={rentalAction ?? "cancel"}
        onClose={() => setRentalAction(null)}
        onConfirm={(extensionOption) => {
          if (rentalAction === "cancel") {
            handleConfirmCancel();
            return;
          }

          if (rentalAction === "extend") {
            console.log("Selected extension:", extensionOption);
            setRentalAction(null);
            return;
          }

          if (rentalAction === "return") {
            handleConfirmReturn();
            setRentalAction(null);
          }

        }}
        loading={updateOrderMutation.isPending}
        extensionOptions={extensionOptions}
      />
    </div>
  );
};

export default RentalSummary;