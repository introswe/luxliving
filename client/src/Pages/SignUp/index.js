import React, { useState } from 'react';
import axiosInstance from '../../axiosConfig';
import Layout from '../Layout'; 
import './style.signup.css'; // Make sure this path is correct

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      firstName,
      lastName,
      email, 
      password,
    };

    axiosInstance.post('/signup', payload)
      .then(response => {
        setMessage('Sign up successful!');
        console.log('Sign Up Successful Frontend:', response.data);
      })
      .catch(error => {
        console.error('There was an error during sign up:', error);
        setMessage(error.response.data.message || 'An error occurred during sign up.');
      });
  };

  return (
    <Layout>
      <div className="signup-page-wrapper"> 
        <div className="signup-container">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div className="signup-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="signup-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="signup-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="signup-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="signup-button">Sign Up</button>
          </form>
          {message && <p className="signup-message">{message}</p>}
        </div>
      </div>
    </Layout>
  );
};

export default SignUpPage;