import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';
import Layout from '../Layout'; 
import './style.home.css';

const HomePage = () => {
  const [message,setMessage] = useState(null);

  useEffect(() => {
      axiosInstance.get('/')
          .then(response => {
            setMessage(response.data);
          })
          .catch(error => {
              console.error('There was an error fetching the products:', error);
          });
  }, []);
    return (
      <Layout>
      <h1>Welcome to Home Page</h1>
      <p>{message ? message.message : 'Loading...'}</p>
      </Layout>
    );
  };

export default HomePage;