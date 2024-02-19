import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig'; 
import Layout from '../Layout';
import './style.sell.css'; 

const FurnitureManager = () => {
  const [furnitureItems, setFurnitureItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({ id: '', title: '', image: '', description: '', price: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axiosInstance.get('/sell/info')
      .then(response => setFurnitureItems(response.data))
      .catch(error => console.error('Error fetching furniture items:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setCurrentItem(item);
  };

  const handleDelete = (itemID) => {
    axiosInstance.delete(`/sell/delete/${itemID}`)
      .then(() => {
        setFurnitureItems(currentItems => currentItems.filter(item => item.id !== itemID));
      })
      .catch(error => {
        console.error('Error deleting furniture item:', error);
        fetchItems();
      });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = isEditing ? '/sell/update' : '/sell/add';
    axiosInstance.post(endpoint, {
      ...currentItem,
      id: isEditing ? currentItem.id : undefined 
    })
    .then(() => {
      fetchItems();
      setIsEditing(false);
      setCurrentItem({ id: '', title: '', image: '', description: '', price: '' }); 
    })
    .catch(error => console.error(`Error ${isEditing ? 'updating' : 'adding'} furniture item:`, error));
  };

  return (
    <Layout>
      <h2 className="furniture-manager-title">Products for Sale</h2>
      <form onSubmit={handleSubmit} className="furniture-form">
        <input name="title" value={currentItem.title} onChange={handleChange} placeholder="Title" />
        <input name="image" value={currentItem.image} onChange={handleChange} placeholder="Image URL" />
        <input name="description" value={currentItem.description} onChange={handleChange} placeholder="Description" />
        <input name="price" value={currentItem.price} onChange={handleChange} placeholder="Price" />
        <button type="submit">{isEditing ? 'Update Item' : 'Add Item'}</button>
        {isEditing && <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>}
      </form>
      <div className="furniture-list">
        {furnitureItems.map(item => (
          <div key={item.id} className="furniture-item">
            <div>Title: {item.title}</div>
            <div>Image: {item.image}</div>
            <div>Description: {item.description}</div>
            <div>Price: {item.price}</div>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default FurnitureManager;
