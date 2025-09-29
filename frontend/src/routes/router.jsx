import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App.jsx";
import Checkout from "../pages/Checkout.jsx";
import HomePageLayout from "../pages/HomePageLayout.jsx";
import LoginForm from "../pages/Login.jsx";
import NewProfile from "../pages/NewProfile.jsx";
import Product from "../pages/Product.jsx";
import Products from "../pages/Products.jsx";
import SearchComponent from "../pages/SearchComponent.jsx";
import SignUpForm from "../pages/SignUpForm.jsx";
import CartPage from "../pages/UserCart.jsx";
import SearchInput from "../pages/SearchInput.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<HomePageLayout />} />
      <Route path="/products" element={<Products />} />
      <Route
        path="/products/category?category=:category"
        element={<Products />}
      />
      <Route path="search" element={<SearchComponent />} />
      <Route path="searchInput" element={<SearchInput/>} />

      <Route path="/products/:productId" element={<Product />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/sign-up" element={<SignUpForm />} />
      {/* <Route path="/" element={<ProfilePopup />} /> */}
      <Route path="/profile" element={<NewProfile />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment-success" element={<NewProfile />} />
    </Route>
  )
);
