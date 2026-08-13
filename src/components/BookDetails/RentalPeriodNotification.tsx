import { Rb_Text } from "@rentbook/rentbook-ui-lib";

interface RentalPeriodNotificationProps {
  rentStartDate: string | null;
  expectedReturnDate: string | null;
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
}: RentalPeriodNotificationProps) => {
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