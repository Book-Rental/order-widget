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
        lg:flex-row
        lg:justify-between
        gap-4
        px-6
        py-5
        hover:bg-gray-50
      "
    >
      {/* Left Section */}
      <div className="flex flex-col items-center gap-4 text-center lg:flex-row lg:items-start lg:text-left">
        <Rb_Image
          src={item.coverImage}
          alt={item.name}
          shape="rounded"
          className="w-24 h-32 border border-gray-200 bg-white !object-contain cursor-pointer sm:w-20 sm:h-28"
          onClick={() => onPdp(item.bookId)}
        />

        <div className="flex flex-col items-center gap-1 text-center lg:items-start lg:text-left">
          {/* Book Name */}
          <Rb_Text
            variant="h6"
            className="
              text-base
              font-semibold
              leading-6
              text-blue-800
              cursor-pointer
              hover:underline
            "
            onClick={() => onPdp(item.bookId)}
          >
            {item.name}
          </Rb_Text>

          {/* Author */}
          <Rb_Text className="text-sm leading-5 text-gray-600">
            {item.author}
          </Rb_Text>

          {/* Rental */}
          <Rb_Text className="text-sm leading-5 text-gray-600">
            Rental: ₹{item.rentalPrice} / {item.rentalType}
          </Rb_Text>
          {/* Total */}
          <div className="text-center sm:text-right">
            <Rb_Text className="text-sm leading-5 text-gray-700">
              Total: ₹{item.totalPrice}{" "}
              <span className="text-xs text-gray-400">
                (Includes rental + security deposit)
              </span>
            </Rb_Text>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-full flex-col items-center gap-3 text-center lg:w-auto lg:items-end lg:text-left">
        
        {/* Status */}
        <OrderStatusBadge status={item.itemStatus} />

        {/* Button */}
        <Rb_Button
          variant="primary"
          className="w-full lg:w-auto"
          onClick={() => onDetails(orderId, item.bookId)}
        >
          More Details
        </Rb_Button>
      </div>
    </div>
  );
}