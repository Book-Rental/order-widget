import './App.css'
import "@rentbook/rentbook-ui-lib/microfrontend.min.css";
import OrderDetails from './pages/OrderDetails';
import OrderBookDetails from './pages/OrderBookDetails';
function App() {
  return (
    <>
     <OrderDetails />
     {/* <OrderBookDetails /> */}
    </>
  )
}

export default App
