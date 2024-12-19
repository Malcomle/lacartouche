import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext"; // Assurez-vous d'avoir useAuth
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ConsejosPage from "./pages/ConsejosPage";
import AdminPage from "./pages/adminPage";
import InitialPage from "./pages/InitialPage";
import BlogPage from "./pages/BlogPage";
import RestrictedAccess from "./pages/RestrictedAccess";
import ConnexionPage from "./pages/ConnexionPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import PayementProcess from "./pages/PayementProcessPage";
import ServiceClientPage from "./pages/ServiceClientPage";
import ProductForm from "./components/ProductForm";
import DashboardContent from "./components/DashboardContent";
import OrdersContent from "./components/OrdersContent";
import ProductsContent from "./components/ProductsContent";
import ProductDetailPage from "./pages/ProductDetailPage";
import SearchResults from "./pages/SearchResults";
import InscriptionPage from "./pages/InscriptionPage";


const AppRoutes = ({ cart, setCart }) => {
  // Garde vérification d'âge
  const AgeVerificationGuard = () => {
    const isAdultConfirmed = localStorage.getItem("isAdultConfirmed");
    if (isAdultConfirmed !== "true") {
      // Redirige vers la page initiale si l'utilisateur n'a pas confirmé son âge
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  };

  // Garde de routes protégées par auth
  const ProtectedRoute = () => {
    const { currentUser } = useAuth();
    if (!currentUser) {
      // Redirige vers /restricted si l'utilisateur n'est pas connecté
      return <Navigate to="/home" replace />;
    }
    return <Outlet />;
  };

  return (
    <Routes>
      <Route path="/" element={<InitialPage />} />
      <Route path="/restricted" element={<RestrictedAccess />} />

      <Route element={<AgeVerificationGuard />}>
        <Route path="/payment-success" element={<PayementProcess />} />
        <Route path="/payement" element={<PayementProcess />} />
        <Route path="/home" element={<HomePage cart={cart} setCart={setCart} />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/atencion-al-cliente" element={<ServiceClientPage />} />
        <Route
          path="/productos/:category"
          element={<ProductsPage cart={cart} setCart={setCart} />}
        />
          <Route path="/search" element={<SearchResults />} />
        <Route path="/consejos" element={<ConsejosPage />} />
        <Route
          path="/shoppingcart"
          element={<ShoppingCartPage cart={cart} setCart={setCart} />}
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/connexion" element={<ConnexionPage />} />
        <Route path="/register" element={<InscriptionPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminPage />}>
            <Route path="dashboard" element={<DashboardContent />} />
            <Route path="orders" element={<OrdersContent />} />
            <Route path="products" element={<ProductsContent />} />
            <Route path="product/new" element={<ProductForm />} />
            <Route path="product/edit/:id" element={<ProductForm />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
