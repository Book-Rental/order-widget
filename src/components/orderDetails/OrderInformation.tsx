import { Rb_Text } from "@rentbook/rentbook-ui-lib";
import type {
  PaymentDetails,
  PriceSummary,
  ShippingAddress,
} from "../../types/order";

interface OrderInformationProps {
  shippingAddress: ShippingAddress;
  payment: PaymentDetails;
  priceSummary: PriceSummary;
}

const OrderInformation = ({
  shippingAddress,
  payment,
  priceSummary,
}: OrderInformationProps) => {
  return (
    <div className="rounded-b-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Shipping */}

        <div className="border-b border-gray-200 pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
          <Rb_Text variant="h5" className="mb-4">
            Shipping Address
          </Rb_Text>

          <div className="space-y-1">
            <Rb_Text>{shippingAddress.name}</Rb_Text>

            <Rb_Text>{shippingAddress.addressLine1}</Rb_Text>

            {shippingAddress.addressLine2 && (
              <Rb_Text>{shippingAddress.addressLine2}</Rb_Text>
            )}

            <Rb_Text>
              {shippingAddress.city}, {shippingAddress.state}
            </Rb_Text>

            <Rb_Text>{shippingAddress.pincode}</Rb_Text>

            <Rb_Text>{shippingAddress.country}</Rb_Text>

            <Rb_Text>{shippingAddress.phone}</Rb_Text>
          </div>
        </div>

        {/* Payment */}

        <div className="border-b border-gray-200 pb-6 lg:border-b-0 lg:border-r lg:px-6 lg:pb-0">
          <Rb_Text variant="h5" className="mb-4">
            Payment Method
          </Rb_Text>

          <div className="space-y-2">
            <Rb_Text>{payment.method}</Rb_Text>

            <Rb_Text>•••• {payment.lastFourDigits}</Rb_Text>

            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
              {payment.paymentStatus}
            </span>
          </div>
        </div>

        {/* Summary */}

        <div className="lg:pl-6">
          <Rb_Text variant="h5" className="mb-4">
            Order Summary
          </Rb_Text>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Rb_Text>Rental Charges</Rb_Text>
              <Rb_Text>₹{priceSummary.rentalCharges}</Rb_Text>
            </div>

            <div className="flex items-center justify-between">
              <Rb_Text>Security Deposit</Rb_Text>
              <Rb_Text>₹{priceSummary.securityDeposit}</Rb_Text>
            </div>

            <div className="flex items-center justify-between">
              <Rb_Text>Shipping</Rb_Text>

              <Rb_Text>
                {priceSummary.shippingCharges === 0
                  ? "Free"
                  : `₹${priceSummary.shippingCharges}`}
              </Rb_Text>
            </div>

            <div className="border-t border-gray-200 pt-3">
              <div className="flex items-center justify-between">
                <Rb_Text className="font-semibold">
                  Total
                </Rb_Text>

                <Rb_Text className="font-semibold">
                  ₹{priceSummary.grandTotal}
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