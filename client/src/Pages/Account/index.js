import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Layout'; 
import './style.css';

const AccountPage = () => {
    const [message,setMessage] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/account')
            .then(response => {
              setMessage(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products:', error);
            });
    }, []);
    return (
      <Layout>
        <h1>This is the Account Page</h1>
        <p>{message ? message.message : 'Loading...'}</p>
      </Layout>
    );
  };

export default AccountPage;