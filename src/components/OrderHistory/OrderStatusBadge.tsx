import {
  MdPending,
  MdCheckCircle,
  MdLocalShipping,
  MdCancel,
  MdAssignmentReturn,
} from "react-icons/md";

const STATUS_CONFIG: any = {
  pending: {
    className: "bg-amber-50 text-amber-700",
    icon: <MdPending />,
  },

  confirmed: {
    className: "bg-blue-50 text-blue-700",
    icon: <MdCheckCircle />,
  },

  shipped: {
    className: "bg-indigo-50 text-indigo-700",
    icon: <MdLocalShipping />,
  },

  delivered: {
    className: "bg-green-50 text-green-700",
    icon: <MdCheckCircle />,
  },

  cancelled: {
    className: "bg-red-50 text-red-700",
    icon: <MdCancel />,
  },

  returned: {
    className: "bg-gray-100 text-gray-700",
    icon: <MdAssignmentReturn />,
  },
};

export default function OrderStatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status.toLowerCase()] ?? STATUS_CONFIG.pending;

  return (
    <span
      className={`
            inline-flex
            items-center
            gap-1
            px-3
            py-1
            rounded-full
            text-xs
            capitalize
            ${config.className}
            `}
    >
      {config.icon}
      {status}
    </span>
  );
}
