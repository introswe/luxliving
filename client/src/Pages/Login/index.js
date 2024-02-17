import React, { useState } from 'react';
import axiosInstance from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout'; 
import './style.login.css'; 

const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      username: username,
      password: password,
    };
    
    axiosInstance.post('/login', payload)
      .then(response => {
        console.log('Login Successful Frontend:', response.data);
      })
      .catch(error => {
        console.error('Login error:', error);
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
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
