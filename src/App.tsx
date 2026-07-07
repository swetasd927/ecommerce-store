import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";

import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import PublicOnlyRoute from "./components/auth/PublicOnlyRoute";
import AppLayout from "./components/layout/AppLayout";

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            }
          />

          {/*
            All protected pages render inside AppLayout (Navbar + Outlet).
           
          */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;