import { useMemo, useState } from "react";
import { RentAgainProduct } from "../types/rentAgain";
import { addToCart } from "../services/cartService";
import type { AddToCartPayload } from "../types/cart";
import { showToast } from "../utils/toast";
import { useOrderDetails } from "./useOrderDetails";

interface UseRentAgainProps {
  orderId: string;
  bookId: string;
}

export const useRentAgain = ({
  orderId,
  bookId,
}: UseRentAgainProps) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { data: orderResponse } = useOrderDetails(orderId);
  const orderDetails = orderResponse?.data;
  const product = useMemo<RentAgainProduct | null>(() => {
    if (!orderDetails) return null;

    const orderItem = orderDetails.items.find(
        (item) => item.bookId._id === bookId
    );
    if (!orderItem) return null;
    return {
      _id: orderItem.bookId._id,
      name: orderItem.bookId.name,
      coverImage: orderItem.bookId.coverImage,
      rentalPricePerDay: orderItem.bookId.rentalPricePerDay,
      rentalPricePerWeek: orderItem.bookId.rentalPricePerWeek,
      rentalPricePerMonth: orderItem.bookId.rentalPricePerMonth,
    };
  }, [orderDetails, bookId]);

  const openModal = () => {
    setIsModalOpen(true);
  };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    const redirectToCart = () => {
        window.history.pushState({}, "", "/cart");
        window.dispatchEvent(new PopStateEvent("popstate"));
    };

    const handleAddToCart = async (payload: AddToCartPayload) => {
        if (!product) return;
        setIsAddingToCart(true);
        try {
            await addToCart(payload);

            setIsAddedToCart(true);

            showToast("Book added to rental cart.", "success");
        } catch (error) {
            showToast(
            error instanceof Error
            ? error.message
            : "Failed to add book to cart.",
            "error"
            );
            console.error(error);
        } finally {
            setIsAddingToCart(false);
        }
    };

  return {
    product,
    isModalOpen,
    isAddedToCart,
    isAddingToCart,
    openModal,
    closeModal,
    handleAddToCart,
    redirectToCart,
  };
};