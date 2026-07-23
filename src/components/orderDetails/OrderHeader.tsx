import { Rb_Text } from "@rentbook/rentbook-ui-lib";
import OrderStatusBadge from "../OrderHistory/OrderStatusBadge";

interface OrderHeaderProps {
  orderNumber: string;
  createdAt: string;
  orderStatus: string;
}

const OrderHeader = ({
  orderNumber,
  createdAt,
  orderStatus,
}: OrderHeaderProps) => {
  return (
    <>
      <Rb_Text variant="h3" className="mb-5 text-left text-2xl sm:mb-6">
        Order Details
      </Rb_Text>

      <div className="rounded-t-xl border border-b-0 border-gray-200 bg-gray-50 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-left min-w-0">
            <Rb_Text variant="h5" className="break-all sm:break-normal">
              Order #{orderNumber}
            </Rb_Text>

            <Rb_Text variant="p" className="mt-1 text-gray-600">
              Ordered on {new Date(createdAt).toLocaleDateString()}
            </Rb_Text>
          </div>

          <div className="self-start sm:self-auto">
            <OrderStatusBadge status={orderStatus} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHeader;