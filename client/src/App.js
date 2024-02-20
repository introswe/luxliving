import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './Authentication/PrivateRoute';
import { AuthProvider } from './Authentication/AuthContext';
import { CartProvider } from './Pages/Cart/CartContext';
import HomePage from './Pages/Home';
import AccountPage from './Pages/Account';
import LoginPage from './Pages/Login';
import OrdersPage from './Pages/Orders';
import CartPage from './Pages/Cart';
import SignUpPage from './Pages/SignUp';
import StoragePage from './Pages/Storage';
import LivingroomPage from './Pages/Livingroom';
import FurniturePage from './Pages/Furniture';
import BedroomPage from './Pages/Bedroom';
import SellPage from './Pages/Sell';
import CheckoutPage from './Pages/Checkout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <CartProvider> 
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/account" element={<PrivateRoute element={<AccountPage />} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/orders" element={<PrivateRoute element={<OrdersPage />} />} />
            <Route path="/cart" element={<PrivateRoute element={<CartPage />} />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/bedroom" element={<BedroomPage />} />
            <Route path="/furniture" element={<FurniturePage />} />
            <Route path="/livingroom" element={<LivingroomPage />} />
            <Route path="/storage" element={<StoragePage />} />
            <Route path="/sell" element={<PrivateRoute element={<SellPage />} />} />
            <Route path="/checkout" element={<PrivateRoute element={<CheckoutPage />} />} />
          </Routes>
        </CartProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;