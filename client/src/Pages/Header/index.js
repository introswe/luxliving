import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const goToHome = () => {
    navigate('/');
  };

  const goToProducts = () => {
    navigate('/products');
  };

  const goToAccount = () => {
    navigate('/account');
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
          <button className="login-button">Sign in</button>
          <button className="account-button">Orders</button>
          <button className="cart-button">Cart</button>
        </div>
      </header>
      {isSidebarOpen && (
        <aside className="sidebar">
          <button onClick={toggleSidebar} className="close-sidebar">X</button>
          <ul>
            <li onClick={goToHome}>Home</li>
            <li onClick={goToProducts}>Products</li>
            <li onClick={goToAccount}>Your Account</li>
            <li>Sign out</li>
          </ul>
        </aside>
      )}
    </div>
  );
};

export default Header;
