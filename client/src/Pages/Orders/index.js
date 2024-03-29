import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';
import Layout from '../Layout'; 
import './style.orders.css';

const CheckoutPage = () => {
    const [message,setMessage] = useState(null);

    useEffect(() => {
        axiosInstance.get('/orders')
          .then(response => {
            setMessage(response.data);
          })
          .catch(error => {
            console.error('Error fetching page:', error);
          });
      }, []);
    return (
      <Layout>
        <h1>This is the Orders Page</h1>
        <p>{message ? message.message : 'Loading...'}</p>
      </Layout>
    );
  };

export default CheckoutPage;