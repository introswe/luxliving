import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Layout'; 
import './style.storage.css';

const StoragePage = () => {
    const [message,setMessage] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3003/storage')
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

export default StoragePage;