import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import OrderDetails from "./pages/OrderDetails";
import OrderBookDetails from "./pages/OrderBookDetails";
import { useEffect } from "react";

const queryClient = new QueryClient();

type View = "order-history" | "order-details";

type AppProps = {
  view?: View;
};

function App({ view }: AppProps) {

  const currentView = view ?? "order-history";


  const params = new URLSearchParams(
    window.location.search
  );

  const orderId = params.get("orderId");
  const bookId = params.get("bookId");
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("widget-loading-status", {
        detail: false,
      })
    );
  }, [currentView, orderId, bookId]);
  return (
    <QueryClientProvider client={queryClient}>
      {currentView === "order-history" && (
        <OrderHistory />
      )}

      {currentView === "order-details" &&
        orderId &&
        bookId && (
          <OrderBookDetails
          />
        )
      }

      {currentView === "order-details" &&
        orderId &&
        !bookId && (
          <OrderDetails />
        )
      }

    </QueryClientProvider>
  );
}

export default App;