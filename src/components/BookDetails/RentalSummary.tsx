import { useState } from "react";
import {
  Rb_Button,
  Rb_Label,
  Rb_Text,
} from "@rentbook/rentbook-ui-lib";

import type { OrderBookDetails } from "../../types/orderedBookDetalils";
import { useUpdateOrder } from "../../hooks/useUpdateOrder";
import { showToast } from "../../utils/toast";
import RentalActionModal, {
  type RentalAction,
  type ExtensionOption,
} from "../RentalActionModal";
import { useReadyForPickup } from "../../hooks/useReadyForPickup";
import { useQueryClient } from "@tanstack/react-query";

interface RentalSummaryProps {
  book: OrderBookDetails;
  orderId: string;
  orderType: "rent" | "auction";
  amount: {
    itemAmount: number;
    rentalAmount: number;
    securityDeposit: number;
    deliveryFee: number;
    discount: number;
    tax: number;
    totalAmount: number;
    refundAmount: number;
  };
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
  orderType,
  amount,
}: RentalSummaryProps) => {
  const updateOrderMutation = useUpdateOrder();
  const readyForPickupMutation = useReadyForPickup();
  const queryClient = useQueryClient();

  const [rentalAction, setRentalAction] =
    useState<RentalAction | null>(null);

  const [isReturnRequesting, setIsReturnRequesting] =
    useState(false);

  const extensionOptions: ExtensionOption[] = [
    {
      value: "day",
      label: "1 Day",
      price: book.rental?.rentalPrice ?? 0,
    },
    {
      value: "week",
      label: "1 Week",
      price: book.rental?.rentalPrice ?? 0,
    },
    {
      value: "month",
      label: "1 Month",
      price: book.rental?.rentalPrice ?? 0,
    },
  ];

  const forwardShipment = book.shipmentDetails?.find(
    (shipment) => shipment.shipmentType === "Forward"
  );

  const returnShipment = book.shipmentDetails?.find(
    (shipment) => shipment.shipmentType === "Return"
  );

  const forwardAwbNumber = forwardShipment?.awbNumber;
  const returnAwbNumber = returnShipment?.awbNumber;
  const returnShipmentId = returnShipment?.shipmentId;

  const redirectToTrackPage = (awbNumber: string) => {
    window.history.pushState(
      {},
      "",
      `/track-shipment/${awbNumber}`
    );

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
    setRentalAction(null);
    setIsReturnRequesting(true);

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
        onSuccess: async () => {
          showToast(
            "Return request raised successfully.",
            "success"
          );

          await queryClient.invalidateQueries({
            queryKey: ["orderBookDetails"],
          });

          setIsReturnRequesting(false);
        },
        onError: (error) => {
          setIsReturnRequesting(false);

          showToast(
            error instanceof Error
              ? error.message
              : "Failed to raise return request.",
            "error"
          );
        },
      }
    );
  };

  /* AUCTION */
  /* AUCTION */
if (orderType === "auction") {
  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <Rb_Text
          variant="h4"
          className="text-base font-semibold text-gray-900"
        >
          Auction Summary
        </Rb_Text>

        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
          Auction
        </span>
      </div>

      <div className="space-y-4">
        <SummaryRow
          label="Winning Bid"
          value={`₹${amount.itemAmount}`}
        />

        <SummaryRow
          label="Delivery Fee"
          value={`₹${amount.deliveryFee}`}
        />

        <SummaryRow
          label="Discount"
          value={`₹${amount.discount}`}
        />

        <SummaryRow
          label="Tax"
          value={`₹${amount.tax}`}
        />

        <SummaryRow
          label="Total Amount"
          value={`₹${amount.totalAmount}`}
        />

        <SummaryRow
          label="Payment Method"
          value={book.payment.paymentMethod}
        />
      </div>
    </div>
  );
}

  /* RENT */
  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <Rb_Text
        variant="h4"
        className="mb-6 text-base font-semibold text-gray-900"
      >
        Rental Summary
      </Rb_Text>

      <div className="space-y-4">
        <SummaryRow
          label="Rental Start"
          value={formatDate(
            book.rental?.rentStartDate ?? null
          )}
        />

        <SummaryRow
          label="Rental End"
          value={formatDate(
            book.rental?.expectedReturnDate ?? null
          )}
        />

        <SummaryRow
          label="Rental Duration"
          value={
            book.rental
              ? `${book.rental.rentalDuration} Days`
              : "-"
          }
        />

        <SummaryRow
          label="Rental Price"
          value={
            book.rental
              ? `₹${book.rental.rentalPrice}`
              : "-"
          }
        />

        <SummaryRow
          label="Security Deposit"
          value={
            book.rental
              ? `₹${book.rental.securityDeposit}`
              : "-"
          }
        />

        <SummaryRow
          label="Payment Method"
          value={book.payment.paymentMethod}
        />
      </div>

      <div className="mt-auto flex flex-col gap-2 pt-8">
        {/* Cancel */}
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

        {/* Shipped */}
        {book.itemStatus === "shipped" && (
          <Rb_Button
            variant="primary"
            onClick={() => {
              if (!forwardAwbNumber) {
                showToast(
                  "Forward shipment not found.",
                  "error"
                );
                return;
              }

              redirectToTrackPage(forwardAwbNumber);
            }}
            className="w-full"
          >
            Track the Book
          </Rb_Button>
        )}

        {/* Out for Delivery */}
        {book.itemStatus === "out_for_delivery" && (
          <div className="flex items-center gap-3 rounded-lg border border-orange-100 bg-orange-50 px-4 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              🚚
            </span>

            <Rb_Text className="text-sm font-medium text-orange-800">
              Your book is out for delivery.
            </Rb_Text>
          </div>
        )}

        {/* Delivered */}
        {book.itemStatus === "delivered" &&
          book.rental && (
            <>
              {book.rental.extensionCount <
                book.rental.maximumExtensions && (
                <Rb_Button
                  variant="primary"
                  onClick={() =>
                    setRentalAction("extend")
                  }
                  className="w-full"
                >
                  Extend Rental
                </Rb_Button>
              )}

              <Rb_Button
                variant="secondary"
                onClick={() =>
                  setRentalAction("return")
                }
                disabled={
                  isReturnRequesting ||
                  updateOrderMutation.isPending
                }
                className="w-full"
              >
                {isReturnRequesting ||
                updateOrderMutation.isPending
                  ? "Processing..."
                  : "Return Book"}
              </Rb_Button>
            </>
          )}

        {/* Return Requested */}
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

              readyForPickupMutation.mutate(
                returnShipmentId,
                {
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
                }
              );
            }}
            disabled={
              readyForPickupMutation.isPending ||
              !returnShipmentId
            }
            className="w-full"
          >
            {readyForPickupMutation.isPending
              ? "Processing..."
              : "Ready to Return Book"}
          </Rb_Button>
        )}

        {/* Return In Progress */}
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

        {/* Returned */}
        {book.itemStatus === "returned" && (
          <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600">
              ✓
            </span>

            <Rb_Text className="text-sm font-medium text-gray-700">
              This book has been returned.
            </Rb_Text>
          </div>
        )}

        {/* Cancelled */}
        {book.itemStatus === "cancelled" && (
          <div className="flex items-center gap-3 rounded-lg border border-red-100 bg-red-50 px-4 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
              ✕
            </span>

            <Rb_Text className="text-sm font-medium text-red-700">
              This book has been cancelled.
            </Rb_Text>
          </div>
        )}
      </div>

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
            console.log(
              "Selected extension:",
              extensionOption
            );

            setRentalAction(null);
            return;
          }

          if (rentalAction === "return") {
            handleConfirmReturn();
          }
        }}
        loading={updateOrderMutation.isPending}
        extensionOptions={extensionOptions}
      />
    </div>
  );
};

export default RentalSummary;