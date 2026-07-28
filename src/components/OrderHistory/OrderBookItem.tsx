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
        hover:bg-gray-50
      "
    >
      <div className="flex gap-4">
        <Rb_Image
          src={item.coverImage}
          alt={item.name}
          shape="rounded"
          className="w-20 h-28 !object-contain bg-white border border-gray-200 cursor-pointer"
          onClick={() => onPdp(item.bookId)}
        />

        <div className="flex flex-col gap-1">
          {/* Book Name */}
          <Rb_Text
            variant="h6"
            className="
              text-blue-800
              text-base
              font-semibold
              leading-6
              cursor-pointer
              hover:underline
            "
            onClick={() => onPdp(item.bookId)}
          >
            {item.name}
          </Rb_Text>

          {/* Author */}
          <Rb_Text className="text-sm text-gray-600 leading-5">
            {item.author}
          </Rb_Text>

          {/* Rental Price */}
          <Rb_Text className="text-sm text-gray-600 leading-5">
            Rental: ₹{item.rentalPrice} / {item.rentalType}
          </Rb_Text>

          {/* Total Price */}
          <Rb_Text className="text-sm text-gray-600 leading-5">
            Total: ₹{item.totalPrice}
          </Rb_Text>

          {/* Additional Information */}
          <Rb_Text className="text-xs text-gray-400 leading-4">
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