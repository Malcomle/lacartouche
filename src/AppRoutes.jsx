import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import AdminPage from "./pages/adminPage";
import OrdersPage from "./pages/OrdersPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";

const AppRoutes = ({ cart, setCart }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/productos/:category" element={<ProductsPage cart={cart} setCart={setCart} />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/productos" element={<AdminPage />} />
      <Route path="/admin/pedidos" element={<OrdersPage />} />
      <Route path="/shoppingcart" element={<ShoppingCartPage cart={cart} setCart={setCart} />} />
    </Routes>
  );
};

export default AppRoutes;
