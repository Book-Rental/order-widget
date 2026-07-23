import { TbShoppingBagX } from "react-icons/tb";
import { Rb_Button, Rb_Text } from "@rentbook/rentbook-ui-lib";

type Props = {
  onBrowse: () => void;
};

export default function EmptyOrders({ onBrowse }: Props) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        min-h-[50vh]
        gap-4
        text-center
        px-4
      "
    >
      <div
        className="
          w-20
          h-20
          rounded-full
          bg-blue-50
          flex
          items-center
          justify-center
        "
      >
        <TbShoppingBagX size={42} className="text-blue-500" />
      </div>

      <div className="space-y-1">
        <Rb_Text variant="h5" className="text-gray-800">
          No orders yet
        </Rb_Text>

        <Rb_Text
          className="
            text-gray-500
            text-sm
            max-w-sm
          "
        >
          Books you rent will appear here. Start exploring books and place your
          first order.
        </Rb_Text>
      </div>
      <Rb_Button onClick={onBrowse}>Browse Books</Rb_Button>
    </div>
  );
}
