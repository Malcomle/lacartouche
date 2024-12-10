import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AdminPage from './pages/adminPage';
import OrdersPage from './pages/OrdersPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/productos/:category" element={<ProductsPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/productos" element={<AdminPage />} />
      <Route path="/admin/pedidos" element={<OrdersPage />} />
    </Routes>
  );
};

export default AppRoutes;