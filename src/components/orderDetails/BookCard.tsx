import { useState } from "react";
import { Rb_Button, Rb_Image, Rb_Text } from "@rentbook/rentbook-ui-lib";

import type { OrderItem } from "../../types/order";
import OrderStatusBadge from "../OrderHistory/OrderStatusBadge";
import { useUpdateOrder } from "../../hooks/useUpdateOrder";
import ConfirmCancelModal from "../ConfirmCancelModal";
import { showToast } from "../../utils/toast";
import { useRentAgain } from "../../hooks/useRentAgain";
import AddToCartModal from "../AddToCartModal";

interface BookCardProps {
  book: OrderItem;
  orderId: string;
}

const BookCard = ({ book, orderId }: BookCardProps) => {
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

  const detailRows = [
    {
      key: "duration",
      label: "Rental Duration",
      value: `${book.rental.rentalDuration} Days`,
    },
    {
      key: "period",
      label: "Rental Period",
      value: `${formatDate(book.rental.rentStartDate)} - ${formatDate(
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
  ];

  const updateOrderMutation = useUpdateOrder();

  const [showCancelModal, setShowCancelModal] = useState(false);

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
          setShowCancelModal(false);
          showToast("Book cancelled successfully.", "success");
        },

        onError: (error) => {
          setShowCancelModal(false);

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
        <div className="flex min-w-0 items-baseline gap-2">
          <Rb_Text className="text-sm leading-5 text-gray-600">
            {dateInfo.label}
          </Rb_Text>

          {dateInfo.value && (
            <Rb_Text className="text-sm leading-5 text-gray-900">
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

        {/* Content & Actions */}
        <div className="flex min-w-0 flex-1 flex-col gap-6 lg:flex-row lg:justify-between">
          {/* Information */}
          <div className="grid min-w-0 flex-1 grid-cols-[130px_minmax(0,1fr)] gap-x-4 gap-y-2">
            {identityRows.map((row) => (
              <div className="contents" key={row.key}>
                <Rb_Text className="text-left text-sm leading-5 text-gray-600">
                  {row.label}
                </Rb_Text>

                <Rb_Text className="min-w-0 truncate text-sm leading-5 text-gray-900">
                  {row.value}
                </Rb_Text>
              </div>
            ))}

            {detailRows.map((row) => (
              <div className="contents" key={row.key}>
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
          <div className="flex w-full shrink-0 flex-col gap-2 lg:w-40">
            {(book.itemStatus === "pending" ||
              book.itemStatus === "confirmed") && (
              <Rb_Button
                variant="secondary"
                className="w-full"
                disabled={updateOrderMutation.isPending}
                onClick={() => setShowCancelModal(true)}
              >
                Cancel the Book
              </Rb_Button>
            )}

            {book.itemStatus === "shipped" && (
              <Rb_Button className="w-full">
                Track Order
              </Rb_Button>
            )}

            {book.itemStatus === "delivered" && (
              <Rb_Button className="w-full">
                Extend Duration
              </Rb_Button>
            )}

            {(book.itemStatus === "returned" ||
              book.itemStatus === "cancelled") && (
              <Rb_Button
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
                {isAddedToCart ? "Added to cart" : "Rent Again"}
              </Rb_Button>
            )}

            <Rb_Button
              variant="secondary"
              className="w-full"
              onClick={handleMoreDetails}
            >
              More Details
            </Rb_Button>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      <ConfirmCancelModal
        open={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleConfirmCancel}
        loading={updateOrderMutation.isPending}
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