import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ConsejosPage from "./pages/ConsejosPage";
import AdminPage from './pages/adminPage';
import OrdersPage from './pages/OrdersPage';
import InitialPage from './pages/InitialPage';
import BlogPage from './pages/BlogPage';
import RestrictedAccess from './pages/RestrictedAccess';
import ShoppingCartPage from "./pages/ShoppingCartPage";
import ServiceClientPage from "./pages/ServiceClientPage";

const AppRoutes = ({ cart, setCart }) => {
  return (
    <Routes>
      <Route path="/" element={<InitialPage />} />
      <Route path="/restricted" element={<RestrictedAccess />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/productos/:category" element={<ProductsPage cart={cart} setCart={setCart} />} />
      <Route path="/consejos" element={<ConsejosPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/productos" element={<AdminPage />} />
      <Route path="/admin/pedidos" element={<OrdersPage />} />
      <Route path="/shoppingcart" element={<ShoppingCartPage cart={cart} setCart={setCart} />} />
      <Route path="/atencion-al-cliente" element={<ServiceClientPage />} />
    </Routes>
  );
};

export default AppRoutes;
