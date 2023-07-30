import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import { SignInPage } from "./Pages/SignInPage/SignInPage";
import { ToastContainer } from "react-toastify";
import { SignUpPage } from "./Pages/SignUpPage/SignUpPage";
import CartPage from "./Pages/CartPage/CartPage";
import ShippingAddressPage from "./Pages/ShippingAddressPage/ShippingAddressPage";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import PlaceOrderPage from "./Pages/PlaceOrderPage/PlaceOrderPage";
import SearchPage from "./Pages/SearchPage/SearchPage";
import ProductPage from "./Pages/ProductPage/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="App">
        <ToastContainer position="bottom-center" limit={1} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:token" element={<ProductPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/shipping" element={<ShippingAddressPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/placeorder" element={<PlaceOrderPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
