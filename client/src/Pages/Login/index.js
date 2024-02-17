import React, { useState } from 'react';
import axiosInstance from '../../axiosConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Authentication/AuthContext';
import Layout from '../Layout'; 
import './style.login.css'; 

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthToken } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const { from } = location.state || { from: { pathname: "/" } };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email: email,
      password: password,
    };
    
    axiosInstance.post('/login', payload)
      .then(response => {
        console.log('Login Successful Frontend:', response.data);
        localStorage.setItem('authToken', response.data.token);
        setAuthToken(response.data.token);
        setMessage('Login successful!');
        navigate(from.pathname, { replace: true });
      })
      .catch(error => {
        console.error('Login error:', error);
        setMessage(error.response.data.message || 'An error occurred during login.');
      });
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <Layout>
      <div className="login-page-wrapper"> 
        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">Login</button>
            <div className="signup-link" onClick={goToSignup}>Sign Up</div>
          </form>
          {message && <p className="signup-message">{message}</p>}
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
