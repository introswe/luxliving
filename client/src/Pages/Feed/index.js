import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../axiosConfig';
import Layout from '../Layout';
import { useCart } from '../Cart/CartContext';
import './style.feed.css'; 

const FeedPage = ({ categoryPath }) => {
    const [furnitureItems, setFurnitureItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const { addToCart, removeFromCart, cartItems } = useCart();

    const fetchItems = useCallback(() => {
        axiosInstance.get(`${categoryPath}/info`)
            .then(response => setFurnitureItems(response.data))
            .catch(error => console.error(`Error fetching items:`, error));
    }, [categoryPath]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems, categoryPath]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = furnitureItems.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const isInCart = itemId => cartItems.some(item => item.id === itemId);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(furnitureItems.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Layout>
            <h2 className="furniture-manager-title">{categoryPath.charAt(1).toUpperCase() + categoryPath.slice(2)}</h2>
            <div className="furniture-list">
                {currentItems.map(item => (
                    <div key={item.id} className="furniture-item">
                        <img src={item.image} alt={item.title} style={{ maxWidth: '100%', height: 'auto' }} />
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <p>Price: {item.price}</p>
                        <button
                            className={`add-to-cart-btn ${isInCart(item.id) ? 'in-cart' : ''}`}
                            onClick={() => isInCart(item.id) ? removeFromCart(item.id) : addToCart(item)}
                        >
                            {isInCart(item.id) ? 'Remove from Cart' : 'Add to Cart'}
                        </button>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {pageNumbers.map(number => (
                    <button key={number} onClick={() => paginate(number)} className="page-number">
                        {number}
                    </button>
                ))}
            </div>
        </Layout>
    );
};

export default FeedPage;
