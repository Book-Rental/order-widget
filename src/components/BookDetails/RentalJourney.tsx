import { Rb_Text } from "@rentbook/rentbook-ui-lib";
import type { BookStatus } from "../../types/order";
import type { IconType } from "react-icons";
import {
  MdCheckCircle,
  MdHome,
  MdPayments,
} from "react-icons/md";
import { FaTruck, FaBoxOpen } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";

interface RentalJourneyProps {
  status: BookStatus;
}

const journeyTitles = [
  "Order Confirmed",
  "Shipped",
  "Delivered",
  "Return Requested",
  "Returned",
  "Deposit Refunded",
] as const;

type JourneyTitle = (typeof journeyTitles)[number];

interface JourneyStep {
  title: JourneyTitle;
  completed: boolean;
}

const statusStepMap: Record<BookStatus, number> = {
  CONFIRMED: 0,
  SHIPPED: 1,
  DELIVERED: 2,
  RETURNED: 5,
  CANCELLED: -1,
};

const journeyIcons: Record<JourneyTitle, IconType> = {
  "Order Confirmed": MdCheckCircle,
  Shipped: FaTruck,
  Delivered: MdHome,
  "Return Requested": RiArrowGoBackFill,
  Returned: FaBoxOpen,
  "Deposit Refunded": MdPayments,
};

const RentalJourney = ({ status }: RentalJourneyProps) => {
  const currentStep = statusStepMap[status];

  const steps: JourneyStep[] = journeyTitles.map((title, index) => ({
    title,
    completed: index <= currentStep,
  }));

  const currentIndex = steps.findIndex((step) => !step.completed);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <Rb_Text
        variant="h4"
        className="mb-8"
      >
        Rental Journey
      </Rb_Text>

      <div className="flex items-start">
        {steps.map((step, index) => {
          const isCurrent = index === currentIndex;
          const isFirst = index === 0;
          const isLast = index === steps.length - 1;

          const Icon = journeyIcons[step.title];

          return (
            <div
              key={step.title}
              className="flex flex-1 flex-col items-center text-center"
            >
              {/* Connector */}
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

                {/* Icon Circle */}
                <div
                  className={`z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    step.completed
                      ? "border-green-600 bg-green-600 text-white"
                      : isCurrent
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  <Icon size={18} />
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

              {/* Title */}
              <div className="mt-3 px-2">
                <Rb_Text
                  variant="small"
                  className={`font-semibold ${
                    step.completed || isCurrent
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
  );
};

export default RentalJourney;