import { Rb_Text } from "@rentbook/rentbook-ui-lib";
import OrderStatusBadge from "../OrderHistory/OrderStatusBadge";

interface OrderHeaderProps {
  orderNumber: string;
  createdAt: string;
  orderStatus: string;
  orderType: "rent" | "auction";
}

const OrderHeader = ({
  orderNumber,
  createdAt,
  orderStatus,
  orderType,
}: OrderHeaderProps) => {
  const isAuction = orderType === "auction";

  return (
    <>
      <Rb_Text
        variant="h3"
        className="mb-5 text-left text-2xl font-semibold leading-8 sm:mb-6"
      >
        Order Details
      </Rb_Text>

      <div className="rounded-t-xl border border-b-0 border-gray-200 bg-gray-50 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <Rb_Text
                variant="h5"
                className="break-all text-base font-semibold leading-6 sm:break-normal"
              >
                Order #{orderNumber}
              </Rb_Text>

              {/* Order Type Badge */}
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                  isAuction
                    ? "bg-purple-100 text-purple-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {isAuction ? "Auction" : "Rent"}
              </span>
            </div>

            <Rb_Text className="mt-1 text-sm leading-5 text-gray-600">
              Ordered on{" "}
              {new Date(createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
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