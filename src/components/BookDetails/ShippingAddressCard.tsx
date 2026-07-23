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
      <Rb_Text variant="h4" className="mb-5">
        Shipping Address
      </Rb_Text>

      <div className="space-y-2 break-words">
        <Rb_Text className="font-semibold">
          {address.name}
        </Rb_Text>

        <Rb_Text>
          {address.phone}
        </Rb_Text>

        <Rb_Text>
          {[
            address.addressLine1,
            address.addressLine2,
            address.landmark,
          ]
            .filter(Boolean)
            .join(", ")}
        </Rb_Text>

        <Rb_Text>
          {`${address.city}, ${address.state} ${address.pincode}`}
        </Rb_Text>

        <Rb_Text>
          {address.country}
        </Rb_Text>
      </div>
    </div>
  );
};

export default ShippingAddressCard;