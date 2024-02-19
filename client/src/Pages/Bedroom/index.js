import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig';
import Layout from '../Layout';
import './style.bedroom.css';

const FurnitureFeed = () => {
    const [furnitureItems, setFurnitureItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = () => {
        axiosInstance.get('/bedroom/info')
            .then(response => {
                setFurnitureItems(response.data);
            })
            .catch(error => console.error('Error fetching furniture items:', error));
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFurnitureItems = furnitureItems.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <Layout>
            <h2 className="furniture-manager-title">Bedrooms</h2>
            <div className="furniture-list">
                {currentFurnitureItems.length > 0 ? currentFurnitureItems.map(item => (
                    <div key={item.id} className="furniture-item">
                        <img src={item.image} alt={item.title} style={{ maxWidth: '100%', height: 'auto' }} />
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <p>Price: {item.price}</p>
                    </div>
                )) : <p>No furniture items found.</p>}
            </div>
            <div className="pagination">
                {Array.from({ length: Math.ceil(furnitureItems.length / itemsPerPage) }, (_, index) => (
                    <button key={index + 1} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </Layout>
    );
};

export default FurnitureFeed;
