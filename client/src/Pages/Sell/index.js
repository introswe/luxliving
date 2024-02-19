import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../axiosConfig';
import Layout from '../Layout';
import './style.sell.css';

const FurnitureManager = () => {
    const [furnitureItems, setFurnitureItems] = useState([]);
    const [currentItem, setCurrentItem] = useState({ id: '', title: '', image: '', description: '', price: '' });
    const [selectedTable, setSelectedTable] = useState('Bedroom');
    const [isEditing, setIsEditing] = useState(false);

    const fetchItems = useCallback(() => {
        axiosInstance.get(`/sell/info/${selectedTable}`)
            .then(response => setFurnitureItems(response.data))
            .catch(error => console.error(`Error fetching ${selectedTable} items:`, error));
    }, [selectedTable]);

    useEffect(() => {
        fetchItems();
        setCurrentItem({ id: '', title: '', image: '', description: '', price: '' });
    }, [fetchItems, selectedTable]); 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentItem(prev => ({ ...prev, [name]: value }));
    };

    const handleEdit = (item) => {
        setIsEditing(true);
        setCurrentItem(item);
        window.scrollTo(0, 0);
    };

    const handleCancel = () => {
        setCurrentItem({ id: '', title: '', image: '', description: '', price: '' });
        setIsEditing(false);
    };

    const handleDelete = (itemID) => {
        axiosInstance.delete(`/sell/delete/${selectedTable}/${itemID}`)
            .then(fetchItems)
            .catch(error => console.error('Error deleting furniture item:', error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const endpoint = isEditing ? `/sell/update/${selectedTable}` : `/sell/add/${selectedTable}`;
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
            <h2 className="furniture-manager-title">My Products</h2>
            <div className="category-select">
                <select value={selectedTable} onChange={e => setSelectedTable(e.target.value)}>
                    <option value="Bedroom">Bedroom</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Livingroom">Livingroom</option>
                    <option value="Storage">Storage</option>
                </select>
            </div>
            <form onSubmit={handleSubmit} className="furniture-form">
                <input name="title" value={currentItem.title} onChange={handleChange} placeholder="Title" />
                <input name="image" value={currentItem.image} onChange={handleChange} placeholder="Image URL" />
                <input name="description" value={currentItem.description} onChange={handleChange} placeholder="Description" />
                <input name="price" value={currentItem.price} onChange={handleChange} placeholder="Price" />
                <button type="submit">{isEditing ? 'Update Item' : 'Add Item'}</button>
                {isEditing && <button type="button" onClick={handleCancel}>Cancel</button>}
            </form>
            <div className="furniture-list">
                {furnitureItems.map(item => (
                    <div key={item.id} className="furniture-item">
                        <div>Title: {item.title}</div>
                        <img src={item.image} alt={item.title} />
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
