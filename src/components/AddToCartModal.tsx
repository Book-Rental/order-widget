import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Dropdown, Rb_Button } from "@rentbook/rentbook-ui-lib";
import { AddToCartPayload } from "../types/cart";
import { RentAgainProduct } from "../types/rentAgain";

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: RentAgainProduct;
  onProceed: (payload: AddToCartPayload) => Promise<void>;
}

const AddToCartModal = ({
  isOpen,
  onClose,
  product,
  onProceed,
}: AddToCartModalProps) => {
  const [selectedDuration, setSelectedDuration] = useState("");
  const isProceedDisabled = !selectedDuration;
  const rentalOptions = [
    {
      label: `1 Day - ₹${product.rentalPricePerDay}`,
      value: "day",
    },
    {
      label: `1 Week - ₹${product.rentalPricePerWeek}`,
      value: "week",
    },
    {
      label: `1 Month - ₹${product.rentalPricePerMonth}`,
      value: "month",
    },
  ];

  const handleClose = () => {
    setSelectedDuration("");
    onClose();
  };

  const handleProceed = async () => {
    if (!selectedDuration) return;
    setSelectedDuration("");
    onClose();
    await onProceed({
        bookId: product._id,
        quantity: 1,
        pricingMode: "rent",
        rentalPeriod: selectedDuration as "day" | "week" | "month",
    });
    };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalHeader onClose={handleClose}>
        Rent Again
      </ModalHeader>

      <ModalBody>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Dropdown
                placeholder="Select Rental Duration"
                options={rentalOptions}
                value={selectedDuration}
                onChange={setSelectedDuration}
            />
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <div className="flex justify-end">
          <Rb_Button
            disabled={isProceedDisabled}
            onClick={handleProceed}
          >
            Proceed
          </Rb_Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default AddToCartModal;