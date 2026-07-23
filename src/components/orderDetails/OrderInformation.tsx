import { Rb_Text } from "@rentbook/rentbook-ui-lib";
import type { OrderDetails } from "../../types/order";

interface OrderInformationProps {
  order: OrderDetails;
}

const OrderInformation = ({
  order
}: OrderInformationProps) => {
  return (
    <div className="rounded-b-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="border-b border-gray-200 pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6 text-left">
          <Rb_Text variant="h5" className="mb-4">
            Shipping Address
          </Rb_Text>
          <div className="space-y-1">
            <Rb_Text>{order.shippingAddress.name}</Rb_Text>
            <Rb_Text>{order.shippingAddress.addressLine1}</Rb_Text>
            <Rb_Text>{order.shippingAddress.landmark}</Rb_Text>
            <Rb_Text>
              {order.shippingAddress.city}, {order.shippingAddress.state}
            </Rb_Text>
            <Rb_Text>{order.shippingAddress.pincode}</Rb_Text>
            <Rb_Text>{order.shippingAddress.country}</Rb_Text>
            <Rb_Text>{order.shippingAddress.phone}</Rb_Text>
          </div>
        </div>

        <div className="border-b border-gray-200 pb-6 lg:border-b-0 lg:border-r lg:px-6 lg:pb-0 text-left">
          <Rb_Text variant="h5" className="mb-4">
            Payment Method
          </Rb_Text>

          <div className="space-y-2">
            <Rb_Text>{order.payment.paymentMethod}</Rb_Text>
            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
              {order.payment.paymentStatus.charAt(0).toUpperCase() + order.payment.paymentStatus.slice(1)}
            </span>
          </div>
        </div>

        <div className="lg:pl-6">
          <Rb_Text variant="h5" className="mb-4 text-left">
            Order Summary
          </Rb_Text>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Rb_Text>Rental Charges</Rb_Text>
              <Rb_Text>₹{order.amount.rentalAmount}</Rb_Text>
            </div>

            <div className="flex items-center justify-between">
              <Rb_Text>Security Deposit</Rb_Text>
              <Rb_Text>₹{order.amount.securityDeposit}</Rb_Text>
            </div>

            <div className="flex items-center justify-between">
              <Rb_Text>Shipping</Rb_Text>

              <Rb_Text>
                {order.amount.deliveryFee === 0
                  ? "Free"
                  : `₹${order.amount.deliveryFee}`}
              </Rb_Text>
            </div>

            <div className="border-t border-gray-200 pt-3">
              <div className="flex items-center justify-between">
                <Rb_Text className="font-semibold">
                  Total
                </Rb_Text>

                <Rb_Text className="font-semibold">
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