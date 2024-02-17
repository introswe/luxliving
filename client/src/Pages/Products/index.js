import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';
import Layout from '../Layout';
import './style.products.css';

function ProductsPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axiosInstance.get('/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products:', error);
            });
    }, []);

    return (
        <Layout >
        <div>
            <h1>Products</h1>
            <ul>
                {products.map(data => (
                    <li key={data.id} > {data.furniture_name} - {data.description}</li>
                ))}
            </ul>
        </div>
        </Layout>
    );
}

export default ProductsPage;