import { Rb_Text } from "@rentbook/rentbook-ui-lib";
import type { OrderAddress } from "../../types/orderedBookDetalils";

interface ShippingAddressCardProps {
  address: OrderAddress;
}

const ShippingAddressCard = ({
  address,
}: ShippingAddressCardProps) => {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <Rb_Text
        variant="h4"
        className="mb-5 text-base font-semibold leading-6 text-gray-900"
      >
        Shipping Address
      </Rb_Text>

      <div className="space-y-2 break-words">
        <Rb_Text className="text-sm leading-5 text-gray-900">
          {address.name}
        </Rb_Text>

        <Rb_Text className="text-sm leading-5 text-gray-600">
          {address.city}, {address.state}
        </Rb_Text>

        <Rb_Text className="text-sm leading-5 text-gray-600">
          {address.country}
        </Rb_Text>

        <Rb_Text className="text-sm leading-5 text-gray-600">
          {address.phone}
        </Rb_Text>
      </div>
    </div>
  );
};

export default ShippingAddressCard;