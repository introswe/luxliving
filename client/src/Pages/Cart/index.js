import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Layout'; 
import './style.cart.css';

const CartPage = () => {
    const [message,setMessage] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3003/cart')
            .then(response => {
              setMessage(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the orders:', error);
            });
    }, []);
    return (
      <Layout>
        <h1>This is the Cart Page</h1>
        <p>{message ? message.message : 'Loading...'}</p>
      </Layout>
    );
  };

export default CartPage;