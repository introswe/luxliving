import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig';
import Layout from '../Layout';
import './style.account.css';

const AccountPage = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: ''
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axiosInstance.get('/account/info')
      .then(response => {
        setUserInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching account info:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEdit = (e) => {
    e.preventDefault(); 
    setEditMode(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.post('/account/update', userInfo)
      .then(response => {
        setEditMode(false); 
      })
      .catch(error => {
        console.error('Error updating account info:', error);
      });
  };

  return (
    <Layout>
      <div className="account-page-wrapper">
        <h2>Account Information</h2>
        <form onSubmit={handleSubmit} className="account-form">
          {Object.entries(userInfo).map(([key, value]) => (
            <div className="account-group" key={key}>
              <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</label>
              <input
                type={key === 'securityCode' ? 'password' : 'text'}
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
          ))}
          <div className="form-actions">
            {editMode ? (
              <>
                <button type="submit" className="save-button">Save</button>
                <button type="button" onClick={() => setEditMode(false)} className="cancel-button">Cancel</button>
              </>
            ) : (
              <button type="button" onClick={handleEdit} className="edit-button">Edit</button>
            )}
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AccountPage;