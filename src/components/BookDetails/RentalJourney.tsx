import { Rb_Text } from "@rentbook/rentbook-ui-lib";
import type { ItemStatus } from "../../types/orderedBookDetalils"
import type { IconType } from "react-icons";
import { MdCheckCircle, MdHome, MdPayments, MdSchedule, MdCancel } from "react-icons/md";
import { FaTruck, FaBoxOpen } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
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
    "Return Requested",
    "Returned",
    "Deposit Refunded",
] as const;

type JourneyTitle = (typeof journeyTitles)[number];

interface JourneyStep {
  title: JourneyTitle | "Return In Progress";
  completed: boolean;
}

const statusStepMap: Record<ItemStatus, number> = {
    pending: 0,
    confirmed: 1,
    shipped: 2,
    out_for_delivery: 3,
    delivered: 4,
    return_requested: 5,
    return_in_progress: 5,
    returned: 6,
    cancelled: -1,
    rejected: -1,
};

const journeyIcons: Record<JourneyTitle, IconType> = {
    Pending: MdSchedule,
    "Order Confirmed": MdCheckCircle,
    Shipped: FaTruck,
    "Out for Delivery": TbTruckDelivery ,
    Delivered: MdHome,
    "Return Requested": RiArrowGoBackFill,
    Returned: FaBoxOpen,
    "Deposit Refunded": MdPayments,
};

const RentalJourney = ({ status }: RentalJourneyProps) => {
  const currentStep = statusStepMap[status];
  const RETURN_STEP_INDEX = 5;

  const steps: JourneyStep[] = journeyTitles.map((title, index) => {
    const displayTitle =
      index === RETURN_STEP_INDEX && status === "return_in_progress"
        ? "Return In Progress"
        : title;

    return {
      title: displayTitle,
      completed: index <= currentStep,
    };
  });

  const isCancelled = status === "cancelled";
  const isRejected = status === "rejected";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <Rb_Text variant="h4" className="mb-6 sm:mb-8">
        Rental Journey
      </Rb_Text>

      {isCancelled || isRejected ? (
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-red-600 bg-red-600 text-white sm:h-10 sm:w-10">
            <MdCancel size={16} className="sm:hidden" />
            <MdCancel size={18} className="hidden sm:block" />
          </div>
          <Rb_Text variant="small" className="font-semibold text-red-600">
            {isRejected ? "Book Unavailable for Rent" : "Order Cancelled"}
          </Rb_Text>
          <Rb_Text variant="small" className="text-gray-500">
             {isRejected
              ? "Sorry, this book is currently unavailable for rent. You can try again when it becomes available."
              : "This order has been cancelled."
              }
          </Rb_Text>
        </div>
      ) : (
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex min-w-[640px] items-start sm:min-w-0">
            {steps.map((step, index) => {
              // const isCurrent = index === currentIndex;
              const isFirst = index === 0;
              const isLast = index === steps.length - 1;
              const Icon = journeyIcons[step.title as JourneyTitle] ?? RiArrowGoBackFill;
              return (
                <div
                  key={step.title}
                  className="flex flex-1 flex-col items-center text-center"
                >
                  <div className="flex w-full items-center">
                    <div
                      className={`h-0.5 flex-1 ${
                        isFirst
                          ? "invisible"
                          : steps[index - 1].completed
                          ? "bg-green-600"
                          : "bg-gray-200"
                      }`}
                    />

                    <div
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 sm:h-10 sm:w-10 ${
                        step.completed
                          ? "border-green-600 bg-green-600 text-white"
                          : "border-gray-300 bg-white text-gray-400"
                      }`}
                    >
                      <Icon size={16} className="sm:hidden" />
                      <Icon size={18} className="hidden sm:block" />
                    </div>

                    <div
                      className={`h-0.5 flex-1 ${
                        isLast
                          ? "invisible"
                          : step.completed
                          ? "bg-green-600"
                          : "bg-gray-200"
                      }`}
                    />
                  </div>

                  <div className="mt-3 px-1">
                    <Rb_Text
                      variant="small"
                      className={`${
                          step.completed 
                          ? "text-gray-900"
                          : "text-gray-400"
                      }`}
                    >
                      {step.title}
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