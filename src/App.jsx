import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navbar from "./components3/Navbar";
import Home from "./components1/Home";
import Registration from "./components1/Registration";
import Login from "./components1/Login";
import About from "./components2/About";
import Contact from "./components2/Contact";
import Cart from "./components3/Cart";
import Checkout from "./components3/Checkout";
import SearchPage from "./components3/SearchPage";
import Products from "./components3/Products";
import ProductPage from "./components3/ProductPage";
import OrderInvoice from "./components3/OrderInvoice";
import { CartProvider } from "./components3/CartContext";
import ProfilePage from "./components3/ProfilePage";
import OrderHistory from "./components3/OrderHistory";
import Footer from "./components3/Footer";
import { UserProvider } from "./components1/UserContext";
import AdminDashBoard from "./components4/AdminDashBoard";
import AdminProductsManagement from "./components4/AdminProductsManagement";
import AdminUserManagement from "./components4/AdminUserManagement";
import AdminSettings from "./components4/AdminSettings";
import PrivateRoute from "./components4/PrivateRoute";
import AllOrders from "./components4/AllOrders";
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

const LayoutWithNavbar = () => (
  <div className="flex flex-col min-min-h-screen">
    <Navbar />
      <Outlet />
    <Footer />
  </div>
);

const LayoutWithoutNavbar = () => (
  <>
    {<Outlet />}
  </>
);



function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <ToastContainer />

          <Routes>
            <Route element={<LayoutWithNavbar />}>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orderinvoice" element={<OrderInvoice />} />
              <Route path="/orderhistory" element={<OrderHistory />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/products" element={<Products />} />
              <Route path="/search/:query" element={<SearchPage />} />
              <Route path="/productpage/:productId" element={<ProductPage />} />
            </Route>

            <Route element={<LayoutWithoutNavbar />}>
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
            </Route>

            <Route path="/admindashboard" element={<PrivateRoute requiredRole="admin"><AdminDashBoard /></PrivateRoute>} />
            <Route path="/adminproductsmanagement" element={<PrivateRoute requiredRole="admin"><AdminProductsManagement /></PrivateRoute>} />
            <Route path="/adminusermanagement" element={<PrivateRoute requiredRole="admin"><AdminUserManagement /></PrivateRoute>} />
            <Route path="/adminSettings" element={<PrivateRoute requiredRole="admin"><AdminSettings /></PrivateRoute>} />
            <Route path="/allorders" element={<PrivateRoute requiredRole="admin"><AllOrders /></PrivateRoute>} />
          </Routes>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
