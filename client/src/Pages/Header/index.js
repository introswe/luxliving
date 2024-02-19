import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Authentication/AuthContext'; 
import './style.header.css';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { authToken, setAuthToken } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const goToHome = () => {
    navigate('/');
  };
  
  const goToAccount = () => {
    navigate('/account');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const goToOrders = () => {
    navigate('/orders');
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const goToBedroom = () => {
    navigate('/bedroom');
  };

  const goToFurniture = () => {
    navigate('/furniture');
  };

  const goToLivingroom = () => {
    navigate('/livingroom');
  };

  const goToStorage = () => {
    navigate('/storage');
  };

  const signout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    navigate('/'); 
    toggleSidebar(); 
  };

  return (
    <div className="header-layout">
      <header className="header-title">
        <div className="logo-and-nav">
          <div className="nav-toggle" onClick={toggleSidebar}>☰</div>
          <h1 className="logo" onClick={goToHome}><span className="lux">Lux</span>Living</h1>
        </div>
        <div className="search-and-actions">
          <input type="text" placeholder="Search LUXLIVING" className="search-bar" />
          <button className="orders-button" onClick={goToOrders}>Orders</button>
          <button className="cart-button" onClick={goToCart}>Cart</button>
        </div>
      </header>
      {isSidebarOpen && (
        <aside className="sidebar">
          <button onClick={toggleSidebar} className="close-sidebar">X</button>
          <ul>
            <li onClick={goToHome}>Home</li>
            <li onClick={goToBedroom}>Bedroom</li>
            <li onClick={goToFurniture}>Furniture</li>
            <li onClick={goToLivingroom}>Living Room</li>
            <li onClick={goToStorage}>Storage</li>
            <li onClick={goToAccount}>Your Account</li>
            {authToken ? (
              <li onClick={signout}>Sign Out</li>
            ) : (
              <li onClick={goToLogin}>Sign In</li>
            )}
          </ul>
        </aside>
      )}
    </div>
  );
};

export default Header;