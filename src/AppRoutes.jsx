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
import ProductForm from './components/ProductForm';
import DashboardContent from './components/DashboardContent';
import OrdersContent from './components/OrdersContent';
import ProductsContent from './components/ProductsContent';

const AppRoutes = ({ cart, setCart }) => {
  return (
    <Routes>
      <Route path="/" element={<InitialPage />} />
      <Route path="/restricted" element={<RestrictedAccess />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/productos/:category" element={<ProductsPage cart={cart} setCart={setCart} />} />
      <Route path="/consejos" element={<ConsejosPage />} />
      <Route path="/admin" element={<AdminPage />}>
        <Route path="dashboard" element={<DashboardContent />} />
        <Route path="orders" element={<OrdersContent />} />
        <Route path="products" element={<ProductsContent />} />
        <Route path="product/new" element={<ProductForm />} />
        <Route path="product/edit/:id" element={<ProductForm />} />
      </Route>
      <Route path="/shoppingcart" element={<ShoppingCartPage cart={cart} setCart={setCart} />} />
    </Routes>
  );
};

export default AppRoutes;
