import React, { useState } from 'react';
import axiosInstance from '../../axiosConfig';
import Layout from '../Layout'; 
import { useNavigate } from 'react-router-dom';
import './style.signup.css'; 

const SignUpPage = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [card, setCard] = useState('');
  const [expiration, setExpiration] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
        firstName,
        lastName,
        email,
        password,
        street,
        city,
        state,
        zipcode,
        card,
        expiration,
        code,
      };
      

    axiosInstance.post('/signup', payload)
      .then(response => {
        setMessage('Sign up successful!');
        console.log('Sign Up Successful Frontend:', response.data);
        navigate('/');
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
            maxLength="255" 
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
            maxLength="255" 
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
            maxLength="255" 
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
            maxLength="255" 
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </div>
        <div className="signup-group">
            <label htmlFor="street">Street</label>
            <input
            type="text"
            id="street"
            value={street}
            maxLength="255" 
            onChange={(e) => setStreet(e.target.value)}
            required
            />
        </div>
        <div className="signup-group">
            <label htmlFor="city">City</label>
            <input
            type="text"
            id="city"
            value={city}
            maxLength="255"
            onChange={(e) => setCity(e.target.value)}
            required
            />
        </div>
        <div className="signup-group">
            <label htmlFor="state">State</label>
            <input
            type="text"
            id="state"
            value={state}
            maxLength="2"
            onChange={(e) => setState(e.target.value)}
            required
            />
        </div>
        <div className="signup-group">
            <label htmlFor="zipcode">Zipcode</label>
            <input
            type="text"
            id="zipcode"
            value={zipcode}
            maxLength="5" 
            onChange={(e) => setZipcode(e.target.value)}
            required
            />
        </div>
        <div className="signup-group">
            <label htmlFor="card">Credit Card Number</label>
            <input
            type="text"
            id="card"
            value={card}
            maxLength="16"
            onChange={(e) => setCard(e.target.value)}
            required
            />
        </div>
        <div className="signup-group">
            <label htmlFor="expiration">Expiration Date</label>
            <input
            type="month"
            id="expiration"
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
            required
            />
        </div>
        <div className="signup-group">
            <label htmlFor="code">CVV</label>
            <input
            type="text"
            id="code"
            value={code}
            maxLength="4" 
            onChange={(e) => setCode(e.target.value)}
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