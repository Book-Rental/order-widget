import { useState } from "react";
import { Rb_Button, Rb_Text } from "@rentbook/rentbook-ui-lib";

type Props = {
  setPage: React.Dispatch<
    React.SetStateAction<
      "order-history" | "order-details" | "book-details"
    >
  >;
};
const OrderHistory = ({ setPage }: Props) => {
  // const userId = "6a3bbe38827e96ec21dcb390";

  const orderHistoryData = [
    {
      orderId: "ORD-001",
      orderDate: "11-07-2026",
      status: "Active",
      totalAmount: 190,
      totalBooks: 3,
      books: [
        {
          _id: "6a3cffd51d1789437feae0ce",
          name: "Dracula",
          author: "Bram Stoker",
          coverImage:
            "https://res.cloudinary.com/dlggszqj9/image/upload/v1782382547/BookImages/Dracula-cover.webp.jpg",
          rentalPrice: 40,
          bookStatus: "Shipped",
        },
        {
          _id: "6a3cff591d1789437feae0c7",
          name: "Frankenstein; or, The Modern Prometheus",
          author: "Mary Shelley",
          coverImage:
            "https://res.cloudinary.com/dlggszqj9/image/upload/v1782382423/BookImages/Frankenstein_%20or%2C%20The%20Modern%20Prometheus-cover.webp.jpg",
          rentalPrice: 30,
          bookStatus: "Delivered",
        },
        {
          _id: "6a3cff591d1789437feae0c8",
          name: "The Old Man and the Sea",
          author: "Ernest Hemingway",
          coverImage:
            "https://res.cloudinary.com/dlggszqj9/image/upload/v1782382294/BookImages/The%20Old%20Man%20and%20the%20Sea-cover.webp.jpg",
          rentalPrice: 120,
          bookStatus: "Confirmed",
        },
      ],
    },
    {
      orderId: "ORD-002",
      orderDate: "28-05-2026",
      status: "Completed",
      totalAmount: 550,
      totalBooks: 1,
      books: [
        {
          _id: "6a3cfcad1d1789437feae0a5",
          name: "Beloved",
          author: "Ernest Hemingway",
          coverImage:
            "https://res.cloudinary.com/dlggszqj9/image/upload/v1782382294/BookImages/The%20Old%20Man%20and%20the%20Sea-cover.webp.jpg",
          rentalPrice: 150,
          bookStatus: "Completed",
        },
      ],
    },
  ];

  const BOOKS_PREVIEW_COUNT = 2;

  // Tracks which orders have their full book list expanded
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});

  const toggleExpanded = (orderId: string) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Rb_Text variant="h3" className="mb-6">
        My Orders
      </Rb_Text>

      {orderHistoryData.map((order) => {
        const isExpanded = !!expandedOrders[order.orderId];
        const hasMoreBooks = order.books.length > BOOKS_PREVIEW_COUNT;
        const visibleBooks =
          hasMoreBooks && !isExpanded
            ? order.books.slice(0, BOOKS_PREVIEW_COUNT)
            : order.books;
        const hiddenCount = order.books.length - BOOKS_PREVIEW_COUNT;

        return (
          <div
            key={order.orderId}
            className="mb-6 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
          >
            {/* Order Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b">
              <div className="flex gap-10">
                <div>
                  <Rb_Text className="text-sm text-gray-500">
                    Ordered On
                  </Rb_Text>
                  <Rb_Text>{order.orderDate}</Rb_Text>
                </div>

                <div>
                  <Rb_Text className="text-sm text-gray-500">
                    Total
                  </Rb_Text>
                  <Rb_Text variant="h5">
                    ₹{order.totalAmount}
                  </Rb_Text>
                </div>
              </div>

              <div className="text-right">
                <Rb_Text variant="h5">
                  #{order.orderId}
                </Rb_Text>

                <button className="text-blue-600 text-sm hover:underline"  onClick={() => setPage("order-details")}>
                  View Details
                </button>
              </div>
            </div>

            {/* Books */}
            {visibleBooks.map((book) => (
              <div
                key={book._id}
                className="flex items-center justify-between gap-6 px-6 py-5 border-b last:border-b-0 hover:bg-gray-50"
              >
                {/* Left */}
                <div className="flex items-center gap-5 flex-1">
                  <img
                    src={book.coverImage}
                    alt={book.name}
                    className="h-28 w-20 rounded-lg border object-cover shadow-sm"
                  />

                  <div>
                    <Rb_Text variant="h5">{book.name}</Rb_Text>

                    <Rb_Text className="text-gray-500 mt-1">
                      {book.author}
                    </Rb_Text>

                    <Rb_Text className="mt-3">
                      <span className="font-semibold">
                        Rental Price:
                      </span>{" "}
                      ₹{book.rentalPrice}
                    </Rb_Text>
                  </div>
                </div>

                {/* Right */}
                <div className="flex flex-col items-end gap-4 min-w-[180px]">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      book.bookStatus === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : book.bookStatus === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : book.bookStatus === "Confirmed"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {book.bookStatus}
                  </span>

                  <Rb_Button onClick={() => setPage("book-details")}>
                    More Details
                  </Rb_Button>
                </div>
              </div>
            ))}

            {/* View More / View Less */}
            {hasMoreBooks && (
              <div className="flex justify-center border-t bg-gray-50 py-3">
                <button
                  onClick={() => toggleExpanded(order.orderId)}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  {isExpanded ? "View Less" : `View ${hiddenCount} More Book${hiddenCount > 1 ? "s" : ""}`}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OrderHistory;