import { Modal, ModalBody, ModalFooter, ModalHeader, Rb_Button, Rb_Text } from "@rentbook/rentbook-ui-lib";

interface ConfirmCancelModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const ConfirmCancelModal = ({
  open,
  onClose,
  onConfirm,
  loading,
}: ConfirmCancelModalProps) => {
  return (
    <Modal isOpen={open} onClose={onClose} >
      <ModalHeader onClose={onClose} >Cancel Book</ModalHeader>
      <ModalBody>
        <Rb_Text>
          Are you sure you want to cancel this book rental?
        </Rb_Text>

        <Rb_Text className="mt-2 text-sm text-gray-500">
          This action cannot be undone.
        </Rb_Text>
      </ModalBody>

      <ModalFooter>
        <Rb_Button variant="secondary" onClick={onClose}>
          Keep the Book
        </Rb_Button>

        <Rb_Button
          className ="!bg-red-600 hover:!bg-red-700"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? "Cancelling..." : "Yes, Cancel Book"}
        </Rb_Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmCancelModal;