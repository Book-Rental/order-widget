import { Rb_Text } from "@rentbook/rentbook-ui-lib";
import type { OrderDetails } from "../../types/order";

interface OrderInformationProps {
  order: OrderDetails;
}

const OrderInformation = ({ order }: OrderInformationProps) => {
  const paymentStatus =
    order.payment.paymentStatus.charAt(0).toUpperCase() +
    order.payment.paymentStatus.slice(1);

  return (
    <div className="rounded-b-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Shipping Address */}
        <div className="border-b border-gray-200 pb-6 text-left lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
          <Rb_Text
            variant="h5"
            className="mb-4 text-base font-semibold leading-6"
          >
            Shipping Address
          </Rb_Text>

          <div className="space-y-1">
            <Rb_Text className="text-sm leading-5 text-gray-600">
              {order.shippingAddress.name}
            </Rb_Text>

            <Rb_Text className="text-sm leading-5 text-gray-600">
              {order.shippingAddress.street}
            </Rb_Text>

            <Rb_Text className="text-sm leading-5 text-gray-600">
              {order.shippingAddress.city}, {order.shippingAddress.state}
            </Rb_Text>

            <Rb_Text className="text-sm leading-5 text-gray-600">
              {order.shippingAddress.country}
            </Rb_Text>

            <Rb_Text className="text-sm leading-5 text-gray-600">
              {order.shippingAddress.zipCode}
            </Rb_Text>

            <Rb_Text className="text-sm leading-5 text-gray-600">
              {order.shippingAddress.phone}
            </Rb_Text>
          </div>
        </div>

        {/* Payment Method */}
        <div className="border-b border-gray-200 pb-6 text-left lg:border-b-0 lg:border-r lg:px-6 lg:pb-0">
          <Rb_Text
            variant="h5"
            className="mb-4 text-base font-semibold leading-6"
          >
            Payment Method
          </Rb_Text>

          <div className="space-y-2">
            <Rb_Text className="text-sm leading-5 text-gray-600">
              {order.payment.paymentMethod}
            </Rb_Text>

            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium leading-5 text-green-700">
              {paymentStatus}
            </span>
          </div>
        </div>

        {/* Price Summary */}
        <div className="text-left lg:pl-6">
          <Rb_Text
            variant="h5"
            className="mb-4 text-base font-semibold leading-6"
          >
            Price Summary
          </Rb_Text>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <Rb_Text className="text-sm leading-5 text-gray-600">
                Rental Charges
              </Rb_Text>

              <Rb_Text className="text-sm leading-5 text-gray-600">
                ₹{order.amount.rentalAmount}
              </Rb_Text>
            </div>

            <div className="flex items-center justify-between gap-4">
              <Rb_Text className="text-sm leading-5 text-gray-600">
                Security Deposit
              </Rb_Text>

              <Rb_Text className="text-sm leading-5 text-gray-600">
                ₹{order.amount.securityDeposit}
              </Rb_Text>
            </div>

            <div className="flex items-center justify-between gap-4">
              <Rb_Text className="text-sm leading-5 text-gray-600">
                Shipping
              </Rb_Text>

              <Rb_Text className="text-sm leading-5 text-gray-600">
                {order.amount.deliveryFee === 0
                  ? "Free"
                  : `₹${order.amount.deliveryFee}`}
              </Rb_Text>
            </div>

            <div className="flex items-center justify-between gap-4">
              <Rb_Text className="text-sm leading-5 text-gray-600">
                Discount
              </Rb_Text>

              <Rb_Text className="text-sm font-medium leading-5 text-green-600">
                -₹{order.amount.discount}
              </Rb_Text>
            </div>

            <div className="flex items-center justify-between gap-4">
              <Rb_Text className="text-sm leading-5 text-gray-600">
                Tax
              </Rb_Text>

              <Rb_Text className="text-sm leading-5 text-gray-600">
                ₹{Number(order.amount.tax).toFixed(1)}
              </Rb_Text>
            </div>

            <div className="border-t border-gray-200 pt-3">
              <div className="flex items-center justify-between gap-4">
                <Rb_Text className="text-sm font-semibold leading-5 text-gray-900">
                  Total
                </Rb_Text>

                <Rb_Text className="text-base font-semibold leading-6 text-gray-900">
                  ₹{order.amount.totalAmount}
                </Rb_Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInformation;
