import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Layout'; 
import './style.livingroom.css';

const LivingroomPage = () => {
    const [message,setMessage] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/livingroom')
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

export default LivingroomPage;