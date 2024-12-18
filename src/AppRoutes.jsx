import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ConsejosPage from "./pages/ConsejosPage";
import AdminPage from './pages/adminPage';
import OrdersPage from './pages/OrdersPage';
import InitialPage from './pages/InitialPage';
import BlogPage from './pages/BlogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import RestrictedAccess from './pages/RestrictedAccess';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<InitialPage />} />
      <Route path="/restricted" element={<RestrictedAccess />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/productos/:category" element={<ProductsPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/consejos" element={<ConsejosPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/productos" element={<AdminPage />} />
      <Route path="/admin/pedidos" element={<OrdersPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />

    </Routes>
  );
};

export default AppRoutes;