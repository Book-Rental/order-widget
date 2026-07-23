import { useState } from "react";
import {
  FiChevronDown,
  FiCalendar,
  FiBookOpen,
  FiArrowRight,
} from "react-icons/fi";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";

import { Rb_Text } from "@rentbook/rentbook-ui-lib";
import OrderBookItem from "./OrderBookItem";
import { Order } from "../../types/orderHistory";

const PREVIEW = 2;

type Props = {
  order: Order;
  onDetails: (orderId: string, bookId: string) => void;
  onPdp: (id: string) => void;
};

export default function OrderCard({ order, onDetails, onPdp }: Props) {
  const [expand, setExpand] = useState(false);
  const books = expand ? order.items : order.items.slice(0, PREVIEW);
  return (
    <div
      className="
        rounded-xl
        border
        border-gray-200
        bg-white
        shadow-sm
        hover:shadow-md
        transition-shadow
        overflow-hidden"
    >
      <div
        className="
          flex
          flex-col
          md:flex-row
          md:justify-between
          gap-4
          bg-gray-50
          px-6
          py-5
          border-b
          border-gray-200"
      >
        <div className="flex flex-wrap gap-8">
          <div>
            <Rb_Text
              className="
                flex
                items-center
                gap-1
                text-xs
                text-gray-500
                uppercase"
            >
              <FiCalendar size={14} />
              Ordered On
            </Rb_Text>

            <Rb_Text className="font-medium mt-1">
              {new Date(order.orderDate).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </Rb_Text>
          </div>
          <div>
            <Rb_Text
              className="
                flex
                items-center
                gap-1
                text-xs
                text-gray-500
                uppercase
              "
            >
              <HiOutlineCurrencyRupee size={14} />
              Total Amount
            </Rb_Text>

            <Rb_Text variant="h5" className="mt-1">
              ₹{order.totalAmount}
            </Rb_Text>
          </div>
          <div>
            <Rb_Text
              className="
                flex
                items-center
                gap-1
                text-xs
                text-gray-500
                uppercase"
            >
              <FiBookOpen size={14} />
              Books
            </Rb_Text>

            <Rb_Text className="font-medium mt-1">{order.totalBooks}</Rb_Text>
          </div>
        </div>

        <div
          className="
            flex
            flex-col
            md:items-end"
        >
          <Rb_Text variant="h6" className="text-gray-800">
            #{order.orderNumber}
          </Rb_Text>

          <button
            className="
              mt-2
              flex
              items-center
              gap-1
              text-sm
              text-blue-600
              hover:text-blue-800"
            onClick={() => onDetails(order.orderId, "")}
          >
            View Details
            <FiArrowRight size={15} />
          </button>
        </div>
      </div>
      <div
        className="
          divide-y
          divide-gray-100
        "
      >
        {books.map((item) => (
          <OrderBookItem
            key={item.bookId}
            item={item}
            orderId={order.orderId}
            onDetails={onDetails}
            onPdp={onPdp}
          />
        ))}
      </div>
      {order.items.length > PREVIEW && (
        <button
          className="
              w-full
              flex
              items-center
              justify-center
              gap-1
              py-3
              text-sm
              font-medium
              text-blue-600
              bg-gray-50
              hover:bg-gray-100
            "
          onClick={() => setExpand(!expand)}
        >
          {expand
            ? "View Less"
            : `View ${order.items.length - PREVIEW} More Books`}

          <FiChevronDown
            size={16}
            className={`
                transition-transform
                ${expand ? "rotate-180" : ""}
              `}
          />
        </button>
      )}
    </div>
  );
}
