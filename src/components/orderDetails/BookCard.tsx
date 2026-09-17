import { useState } from "react";
import {
  Rb_Button,
  Rb_Image,
  Rb_Text,
} from "@rentbook/rentbook-ui-lib";

import type { OrderItem } from "../../types/order";
import OrderStatusBadge from "../OrderHistory/OrderStatusBadge";
import { useUpdateOrder } from "../../hooks/useUpdateOrder";
import { showToast } from "../../utils/toast";
import { useRentAgain } from "../../hooks/useRentAgain";
import AddToCartModal from "../AddToCartModal";
import RentalActionModal, {
  type RentalAction,
  type ExtensionOption,
} from "../RentalActionModal";

interface BookCardProps {
  book: OrderItem;
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

const BookCard = ({
  book,
  orderId,
  orderType,
  amount,
}: BookCardProps) => {
  const [rentalAction, setRentalAction] =
    useState<RentalAction | null>(null);

  const updateOrderMutation = useUpdateOrder();

  const formatDate = (date?: string | null) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleMoreDetails = () => {
    window.history.pushState(
      {},
      "",
      `/order-details?orderId=${orderId}&bookId=${book.bookId._id}`
    );

    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const getDateInfo = () => {
    if (orderType === "auction" || !book.rental) {
      return {
        label: "",
        value: "",
      };
    }

    switch (book.itemStatus) {
      case "pending":
      case "confirmed":
      case "shipped":
        return {
          label: "Expected Delivery Date",
          value: book.rental.rentStartDate,
        };

      case "returned":
        return {
          label: "Returned On",
          value: book.rental.actualReturnDate,
        };

      default:
        return {
          label: "",
          value: "",
        };
    }
  };

  const dateInfo = getDateInfo();

  const identityRows = [
    {
      key: "book",
      label: "Book",
      value: book.bookId.name,
    },
    {
      key: "author",
      label: "Author",
      value: book.bookId.author,
    },
  ];

  const detailRows =
    orderType === "auction"
      ? [
          {
            key: "winningBid",
            label: "Winning Bid",
            value: `₹${amount.itemAmount}`,
          },
        ]
      : book.rental
        ? [
            {
              key: "duration",
              label: "Rental Duration",
              value: `${book.rental.rentalDuration} Days`,
            },
            {
              key: "period",
              label: "Rental Period",
              value: `${formatDate(
                book.rental.rentStartDate
              )} - ${formatDate(
                book.rental.expectedReturnDate
              )}`,
            },
            {
              key: "price",
              label: "Rental Price",
              value: `₹${book.rental.rentalPrice}`,
            },
            {
              key: "deposit",
              label: "Security Deposit",
              value: `₹${book.rental.securityDeposit}`,
            },
          ]
        : [];

  const extensionOptions: ExtensionOption[] = [
    {
      value: "day",
      label: "1 Day",
      price: book.bookId.rentalPricePerDay,
    },
    {
      value: "week",
      label: "1 Week",
      price: book.bookId.rentalPricePerWeek,
    },
    {
      value: "month",
      label: "1 Month",
      price: book.bookId.rentalPricePerMonth,
    },
  ];

  const handleConfirmCancel = () => {
    updateOrderMutation.mutate(
      {
        orderId,
        payload: {
          items: [
            {
              _id: book._id,
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

  const {
    product,
    isModalOpen,
    isAddedToCart,
    isAddingToCart,
    openModal,
    closeModal,
    handleAddToCart,
    redirectToCart,
  } = useRentAgain({
    orderId,
    bookId: book.bookId._id,
  });

  return (
    <div className="mx-auto w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-6">
      {/* Date & Status */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Rb_Text className="text-sm font-medium text-gray-700">
            {dateInfo.label}
          </Rb_Text>

          {dateInfo.value && (
            <Rb_Text className="text-sm font-semibold text-gray-900">
              {formatDate(dateInfo.value)}
            </Rb_Text>
          )}
        </div>

        <div className="shrink-0">
          <OrderStatusBadge status={book.itemStatus} />
        </div>
      </div>

      {/* Book Details */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
        {/* Book Image */}
        <div className="mx-auto flex w-28 shrink-0 items-center justify-center sm:mx-0">
          <Rb_Image
            src={book.bookId.coverImage}
            alt={book.bookId.name}
            shape="rounded"
            className="h-40 w-28 border !object-contain"
          />
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-6 lg:flex-row">
          {/* Information */}
          <div className="grid min-w-0 flex-1 grid-cols-[130px_minmax(0,1fr)] gap-x-4 gap-y-2">
            {identityRows.map((row) => (
              <div
                className="contents"
                key={row.key}
              >
                <Rb_Text className="text-left text-sm leading-5 text-gray-600">
                  {row.label}
                </Rb_Text>

                <Rb_Text className="min-w-0 truncate text-sm leading-5 text-gray-900">
                  {row.value}
                </Rb_Text>
              </div>
            ))}

            {detailRows.map((row) => (
              <div
                className="contents"
                key={row.key}
              >
                <Rb_Text className="text-left text-sm leading-5 text-gray-600">
                  {row.label}
                </Rb_Text>

                <Rb_Text className="min-w-0 truncate text-sm leading-5 text-gray-900">
                  {row.value}
                </Rb_Text>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex w-full flex-col justify-end gap-2 self-stretch lg:w-40 lg:self-end">
            {/* Cancel */}
            {orderType === "rent" &&
              (book.itemStatus === "pending" ||
                book.itemStatus === "confirmed") && (
                <Rb_Button
                  variant="secondary"
                  className="w-full"
                  disabled={
                    updateOrderMutation.isPending
                  }
                  onClick={() =>
                    setRentalAction("cancel")
                  }
                >
                  Cancel the Book
                </Rb_Button>
              )}

            {/* Extend Rental */}
            {orderType === "rent" &&
              book.itemStatus === "delivered" &&
              book.rental &&
              book.rental.extensionCount <
                book.rental.maximumExtensions && (
                <Rb_Button
                  variant="primary"
                  className="w-full"
                  onClick={() =>
                    setRentalAction("extend")
                  }
                >
                  Extend Rental
                </Rb_Button>
              )}

            {/* Rent Again */}
            {orderType === "rent" &&
              book.itemStatus === "cancelled" && (
                <Rb_Button
                  variant="primary"
                  className="w-full"
                  onClick={() => {
                    if (isAddedToCart) {
                      redirectToCart();
                      return;
                    }

                    openModal();
                  }}
                  disabled={isAddingToCart}
                >
                  {isAddedToCart
                    ? "Added to Cart"
                    : "Rent Again"}
                </Rb_Button>
              )}

            {/* More Details */}
            <Rb_Button
              variant="primary"
              className="w-full"
              onClick={handleMoreDetails}
            >
              More Details
            </Rb_Button>
          </div>
        </div>
      </div>

      {/* Rental Action Modal */}
      <RentalActionModal
        open={rentalAction !== null}
        action={rentalAction ?? "cancel"}
        onClose={() => setRentalAction(null)}
        loading={updateOrderMutation.isPending}
        extensionOptions={extensionOptions}
        onConfirm={(extensionOption) => {
          if (rentalAction === "cancel") {
            handleConfirmCancel();
            return;
          }

          if (rentalAction === "return") {
            updateOrderMutation.mutate(
              {
                orderId,
                payload: {
                  items: [
                    {
                      _id: book._id,
                      itemStatus: "return_requested",
                    },
                  ],
                },
              },
              {
                onSuccess: () => {
                  setRentalAction(null);

                  showToast(
                    "Return request raised successfully.",
                    "success"
                  );
                },
                onError: (error) => {
                  setRentalAction(null);

                  showToast(
                    error instanceof Error
                      ? error.message
                      : "Failed to raise return request.",
                    "error"
                  );
                },
              }
            );

            return;
          }

          if (
            rentalAction === "extend" &&
            extensionOption
          ) {
            setRentalAction(null);

            showToast(
              `Selected ${extensionOption.label} extension for ₹${extensionOption.price}.`,
              "success"
            );
          }
        }}
      />

      {/* Rent Again Modal */}
      {product && (
        <AddToCartModal
          isOpen={isModalOpen}
          onClose={closeModal}
          product={product}
          onProceed={handleAddToCart}
        />
      )}
    </div>
  );
};

export default BookCard;