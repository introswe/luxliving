import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './Authentication/PrivateRoute';
import { AuthProvider } from './Authentication/AuthContext';
import HomePage from './Pages/Home';
import ProductsPage from './Pages/Products';
import AccountPage from './Pages/Account';
import LoginPage from './Pages/Login';
import OrdersPage from './Pages/Orders';
import CartPage from './Pages/Cart';
import SignUpPage from './Pages/SignUp';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/account" element={<PrivateRoute element={<AccountPage />} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/orders" element={<PrivateRoute element={<OrdersPage />} />} />
          <Route path="/cart" element={<PrivateRoute element={<CartPage />} />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
