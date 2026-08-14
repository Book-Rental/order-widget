import { Rb_Text } from "@rentbook/rentbook-ui-lib";

interface RentalPeriodNotificationProps {
  rentStartDate: string | null;
  expectedReturnDate: string | null;
  pickupAgentName?: string;
  pickupAgentPhone?: string;
}

const formatDate = (date: string | null) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const RentalPeriodNotification = ({
  rentStartDate,
  expectedReturnDate,
  pickupAgentName,
  pickupAgentPhone
}: RentalPeriodNotificationProps) => {
  if (pickupAgentName) {
    return (
      <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm text-blue-700">
            ✓
          </span>

          <Rb_Text className="text-sm font-semibold text-blue-800">
            Pickup Agent Assigned
          </Rb_Text>
        </div>

        <div className="mt-3 space-y-1">
          <Rb_Text className="text-xs text-blue-600">
            Pickup Agent
          </Rb_Text>
          <Rb_Text className="text-sm font-semibold text-blue-900">
            {pickupAgentName}
          </Rb_Text>
        </div>

        {pickupAgentPhone && (
          <div className="mt-3 space-y-1">
            <Rb_Text className="text-xs text-blue-600">
              Contact Number
            </Rb_Text>
            <Rb_Text className="text-sm font-semibold text-blue-900">
              {pickupAgentPhone}
            </Rb_Text>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 shadow-sm">
      {/* Heading */}
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-sm text-green-700">
          ✓
        </span>

        <Rb_Text className="text-sm font-semibold text-green-800">
          Rental period is active
        </Rb_Text>
      </div>

      {/* Description */}
      <Rb_Text className="mt-3 text-sm leading-6 text-green-700">
        Your rental period started on{" "}
        <span className="rounded-md bg-white px-2 py-1 font-semibold text-green-900 shadow-sm">
          {formatDate(rentStartDate)}
        </span>{" "}
        and will end on{" "}
        <span className="rounded-md bg-white px-2 py-1 font-semibold text-green-900 shadow-sm">
          {formatDate(expectedReturnDate)}
        </span>
        .
      </Rb_Text>
    </div>
  );
};

export default RentalPeriodNotification;