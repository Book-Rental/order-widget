import { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Rb_Button,
  Rb_Label,
  Rb_Text,
} from "@rentbook/rentbook-ui-lib";

export type RentalAction = "cancel" | "extend" | "return";

export interface ExtensionOption {
  value: "day" | "week" | "month";
  label: string;
  price: number;
}

interface RentalActionModalProps {
  open: boolean;
  action: RentalAction;
  onClose: () => void;
  onConfirm: (extensionOption?: ExtensionOption) => void;
  loading?: boolean;
  extensionOptions?: ExtensionOption[];
}

const ACTION_CONFIG: Record<
  RentalAction,
  {
    title: string;
    description: string;
    confirmText: string;
    loadingText: string;
  }
> = {
  cancel: {
    title: "Cancel Book",
    description: "Are you sure you want to cancel this book rental?",
    confirmText: "Yes, Cancel Book",
    loadingText: "Cancelling...",
  },

  extend: {
    title: "Extend Rental",
    description: "Select how long you want to extend your rental.",
    confirmText: "Extend Rental",
    loadingText: "Extending...",
  },

  return: {
    title: "Return Book",
    description: "Are you sure you want to raise a return request for this book? You can extend the rental duration. To Keep the book proceed with Extend rental",
    confirmText: "Raise Return Request",
    loadingText: "Submitting...",
  },
};

const RentalActionModal = ({
  open,
  action,
  onClose,
  onConfirm,
  loading = false,
  extensionOptions = [],
}: RentalActionModalProps) => {
  const [selectedExtension, setSelectedExtension] =
    useState<string>("");

  const config = ACTION_CONFIG[action];

  useEffect(() => {
    if (!open) {
      setSelectedExtension("");
    }
  }, [open]);

  const handleConfirm = () => {
    if (action === "extend") {
      const selectedOption = extensionOptions.find(
        (option) => option.value === selectedExtension
      );

      if (!selectedOption) {
        return;
      }

      onConfirm(selectedOption);
      return;
    }

    onConfirm();
  };

  const isExtendAction = action === "extend";

  const isConfirmDisabled =
    loading ||
    (isExtendAction && !selectedExtension);

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalHeader onClose={onClose}>
        {config.title}
      </ModalHeader>

      <ModalBody>
        <Rb_Text>{config.description}</Rb_Text>

        {action === "cancel" && (
          <Rb_Text className="mt-2 text-sm text-gray-500">
            This action cannot be undone.
          </Rb_Text>
        )}

        {action === "return" && (
          <div className="mt-4 space-y-2 rounded-lg border border-orange-100 bg-orange-50 p-4">
            <Rb_Text className="text-sm font-medium text-orange-800">
              A return request will be raised for this book.
            </Rb_Text>

            <Rb_Text className="text-sm leading-5 text-orange-700">
              An agent will be assigned to you soon please proceed. Please keep the book ready for
              return.
            </Rb_Text>

            <Rb_Text className="text-sm leading-5 text-orange-700">
              The book condition will be checked during pickup. If the book is found
              to be damaged, an amount may be deducted from your security deposit
              based on the extent of the damage.
            </Rb_Text>
          </div>
        )}

        {isExtendAction && (
          <div className="mt-5">
            <Rb_Label className="mb-2 block text-sm font-medium text-gray-700">
              Extension Duration
            </Rb_Label>

            <select
              value={selectedExtension}
              onChange={(event) =>
                setSelectedExtension(event.target.value)
              }
              disabled={loading}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            >
              <option value="">
                Select Extension Duration
              </option>

              {extensionOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label} - ₹{option.price}
                </option>
              ))}
            </select>
          </div>
        )}
      </ModalBody>

      <ModalFooter>
        <Rb_Button
          variant="secondary"
          onClick={onClose}
          disabled={loading}
        >
          {isExtendAction ? "Cancel" : "Keep the Book"}
        </Rb_Button>

        <Rb_Button
          onClick={handleConfirm}
          disabled={isConfirmDisabled}
          className={
            action === "cancel"
              ? "!bg-red-600 hover:!bg-red-700"
              : ""
          }
        >
          {loading
            ? config.loadingText
            : config.confirmText}
        </Rb_Button>
      </ModalFooter>
    </Modal>
  );
};

export default RentalActionModal;