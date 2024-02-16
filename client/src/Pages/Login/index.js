import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Layout'; 
import './style.css';

const LoginPage = () => {
    const [message,setMessage] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/login')
            .then(response => {
              setMessage(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products:', error);
            });
    }, []);
    return (
      <Layout>
        <h1>Login Page</h1>
        <p>{message ? message.message : 'Loading...'}</p>
      </Layout>
    );
  };

export default LoginPage;