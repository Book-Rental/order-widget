import { Rb_Text } from "@rentbook/rentbook-ui-lib";
import type { ItemStatus } from "../../types/orderedBookDetalils";
import type { IconType } from "react-icons";

import {
  MdCheckCircle,
  MdHome,
  MdSchedule,
  MdCancel,
} from "react-icons/md";

import { FaTruck } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";

interface RentalJourneyProps {
  status: ItemStatus;
}

const journeyTitles = [
  "Pending",
  "Order Confirmed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
] as const;

type JourneyTitle = (typeof journeyTitles)[number];

const statusStepMap: Record<ItemStatus, number> = {
  pending: 0,
  confirmed: 1,
  shipped: 2,
  out_for_delivery: 3,
  delivered: 4,

  // Return/cancelled statuses keep the delivery journey
  // at Delivered.
  return_requested: 4,
  return_in_progress: 4,
  returned: 4,

  cancelled: -1,
  rejected: -1,
};

const journeyIcons: Record<JourneyTitle, IconType> = {
  Pending: MdSchedule,
  "Order Confirmed": MdCheckCircle,
  Shipped: FaTruck,
  "Out for Delivery": TbTruckDelivery,
  Delivered: MdHome,
};

const RentalJourney = ({
  status,
}: RentalJourneyProps) => {
  const currentStep = statusStepMap[status];

  const isCancelled = status === "cancelled";
  const isRejected = status === "rejected";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <Rb_Text
        variant="h4"
        className="mb-6 sm:mb-8"
      >
        Rental Journey
      </Rb_Text>

      {isCancelled || isRejected ? (
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-red-600 bg-red-600 text-white sm:h-10 sm:w-10">
            <MdCancel
              size={16}
              className="sm:hidden"
            />

            <MdCancel
              size={18}
              className="hidden sm:block"
            />
          </div>

          <Rb_Text
            variant="small"
            className="font-semibold text-red-600"
          >
            {isRejected
              ? "Book Unavailable for Rent"
              : "Order Cancelled"}
          </Rb_Text>

          <Rb_Text
            variant="small"
            className="text-gray-500"
          >
            {isRejected
              ? "Sorry, this book is currently unavailable for rent. You can try again when it becomes available."
              : "This order has been cancelled."}
          </Rb_Text>
        </div>
      ) : (
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex min-w-[640px] items-start sm:min-w-0">
            {journeyTitles.map((title, index) => {
              const isCompleted =
                index <= currentStep;

              const isFirst = index === 0;
              const isLast =
                index === journeyTitles.length - 1;

              const Icon = journeyIcons[title];

              return (
                <div
                  key={title}
                  className="flex flex-1 flex-col items-center text-center"
                >
                  <div className="flex w-full items-center">
                    {/* Left Line */}
                    <div
                      className={`h-0.5 flex-1 ${
                        isFirst
                          ? "invisible"
                          : index - 1 <= currentStep
                            ? "bg-green-600"
                            : "bg-gray-200"
                      }`}
                    />

                    {/* Step */}
                    <div
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 sm:h-10 sm:w-10 ${
                        isCompleted
                          ? "border-green-600 bg-green-600 text-white"
                          : "border-gray-300 bg-white text-gray-400"
                      }`}
                    >
                      <Icon
                        size={16}
                        className="sm:hidden"
                      />

                      <Icon
                        size={18}
                        className="hidden sm:block"
                      />
                    </div>

                    {/* Right Line */}
                    <div
                      className={`h-0.5 flex-1 ${
                        isLast
                          ? "invisible"
                          : isCompleted
                            ? "bg-green-600"
                            : "bg-gray-200"
                      }`}
                    />
                  </div>

                  {/* Title */}
                  <div className="mt-3 px-1">
                    <Rb_Text
                      variant="small"
                      className={
                        isCompleted
                          ? "text-gray-900"
                          : "text-gray-400"
                      }
                    >
                      {title}
                    </Rb_Text>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalJourney;