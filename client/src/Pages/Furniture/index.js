import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Layout'; 
import './style.furniture.css';

const FurniturePage = () => {
    const [message,setMessage] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/furniture')
            .then(response => {
              setMessage(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the orders:', error);
            });
    }, []);
    return (
      <Layout>
        <p>{message ? message.message : 'Loading...'}</p>
      </Layout>
    );
  };

export default FurniturePage;