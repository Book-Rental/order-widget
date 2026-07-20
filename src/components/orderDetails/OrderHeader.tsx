import { Rb_Text } from "@rentbook/rentbook-ui-lib";

interface OrderHeaderProps {
  orderId: string;
  orderDate: string;
  orderStatus: string;
}

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Active",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const OrderHeader = ({
  orderId,
  orderDate,
  orderStatus,
}: OrderHeaderProps) => {
  return (
    <>
      <Rb_Text variant="h3" className="mb-5 text-center text-2xl sm:mb-6">
        Order Details
      </Rb_Text>

      <div className="rounded-t-xl border border-b-0 border-gray-200 bg-gray-50 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <Rb_Text variant="h5">
              Order #{orderId}
            </Rb_Text>

            <Rb_Text variant="p" className="mt-1 text-gray-600">
              Ordered on {orderDate}
            </Rb_Text>
          </div>

          <div className="flex justify-center sm:justify-end">
            <span
              className={`rounded-full px-4 py-1 text-sm font-medium ${
                STATUS_COLORS[orderStatus]
              }`}
            >
              {STATUS_LABELS[orderStatus]}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHeader;