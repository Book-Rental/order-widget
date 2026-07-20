import {
  Rb_Label,
  Rb_Text,
} from "@rentbook/rentbook-ui-lib";
import type { ShippingAddress } from "../../types/order";

interface ShippingAddressCardProps {
  address: ShippingAddress;
}

const ShippingAddressCard = ({
  address,
}: ShippingAddressCardProps) => {
  return (
    <div className="h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <Rb_Text
        variant="h4"
        className="mb-5"
      >
        Shipping Address
      </Rb_Text>

      <div className="space-y-4">
        <AddressRow
          label="Name"
          value={address.name}
        />

        <AddressRow
          label="Phone"
          value={address.phone}
        />

        <AddressRow
          label="Address"
          value={`${address.addressLine1}${
            address.addressLine2
              ? `, ${address.addressLine2}`
              : ""
          }`}
        />

        <AddressRow
          label="City"
          value={address.city}
        />

        <AddressRow
          label="State"
          value={address.state}
        />

        <AddressRow
          label="Pincode"
          value={address.pincode}
        />

        <AddressRow
          label="Country"
          value={address.country}
        />
      </div>
    </div>
  );
};

interface AddressRowProps {
  label: string;
  value: string;
}

const AddressRow = ({
  label,
  value,
}: AddressRowProps) => (
  <div className="flex justify-between gap-5 border-b border-gray-100 pb-3">
    <Rb_Label className="text-sm text-gray-500">
      {label}
    </Rb_Label>

    <Rb_Text
      variant="span"
      className="text-right font-medium"
    >
      {value}
    </Rb_Text>
  </div>
);

export default ShippingAddressCard;