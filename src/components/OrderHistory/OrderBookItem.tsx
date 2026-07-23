import { Rb_Button, Rb_Image, Rb_Text } from "@rentbook/rentbook-ui-lib";

import OrderStatusBadge from "./OrderStatusBadge";
import { OrderItem } from "../../types/orderHistory";


type Props = {
  item: OrderItem;
  orderId: string;
  onDetails: (orderId: string, bookId: string) => void;
  onPdp: (id: string) => void;
};

export default function OrderBookItem({
  item,
  orderId,
  onDetails,
  onPdp,
}: Props) {
  return (
    <div
      className="
        flex
        flex-col
        sm:flex-row
        justify-between
        gap-4
        px-6
        py-5
        hover:bg-gray-50"
    >
      <div className="flex gap-4">
        <Rb_Image
          src={item.coverImage}
          alt={item.name}
          shape="rounded"
          className="w-20 h-28 !object-contain bg-white border border-gray-200 cursor-pointer"
          onClick={() => onPdp(item.bookId)}
        />

        <div>
          <Rb_Text
            variant="h6"
            className="
            text-blue-800
            cursor-pointer
            hover:underline"
            onClick={() => onPdp(item.bookId)}
          >
            {item.name}
          </Rb_Text>

          <Rb_Text className="text-gray-500">{item.author}</Rb_Text>

          <Rb_Text className="text-sm">
            Rental: ₹{item.rentalPrice} / {item.rentalType}
          </Rb_Text>

          <Rb_Text variant="h6">Total: ₹{item.totalPrice}</Rb_Text>
          <Rb_Text className="text-gray-400 text-xs">
            Includes rental + security deposit
          </Rb_Text>
        </div>
      </div>

      <div className="flex flex-col gap-3 items-end">
        <OrderStatusBadge status={item.itemStatus} />

        <Rb_Button onClick={() => onDetails(orderId, item.bookId)}>
          More Details
        </Rb_Button>
      </div>
    </div>
  );
}
