import { Outlet } from "react-router-dom";
import Footer from "./pages/Footer.jsx";
import Navbar from "./pages/Navbar.jsx";
import MyProvider from "./store/MyProvider.jsx";
import { ToastContainer } from "react-toastify";
// import Product from "../../backend/models/product.js";

const App = () => {
  return (
    <div>
      <MyProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </MyProvider>
      <ToastContainer/>
    </div>
  );
};

export default App;
