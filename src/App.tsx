import { useState } from "react";
import "./App.css";

import OrderDetails from "./pages/OrderDetails";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import OrderBookDetails from "./pages/OrderBookDetails";
import '@rentbook/rentbook-ui-lib/microfrontend.min.css'
function App() {
  const [page, setPage] = useState<
    "order-history" | "order-details" | "book-details"
  >("order-history");

  switch (page) {
    case "order-history":
      return (
        <OrderHistory
          setPage={setPage}
        />
      );

    case "order-details":
      return <OrderDetails />;

    case "book-details":
      return <OrderBookDetails />;

    default:
      return null;
  }
}

export default App;