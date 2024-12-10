import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ConsejosPage from "./pages/ConsejosPage";
import AdminPage from './pages/adminPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/productos/:category" element={<ProductsPage />} />
      <Route path="/consejos" element={<ConsejosPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/productos" element={<AdminPage />} />
      <Route path="/admin/pedidos" element={<AdminPage />} />
    </Routes>
  );
};

export default AppRoutes;