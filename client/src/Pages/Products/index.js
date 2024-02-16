import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products:', error);
            });
    }, []);

    // Handler to navigate to Home Page
    const goToHomePage = () => {
        navigate('/');
    };

    return (
        <Layout >
        <div>
            <h1>Products</h1>
            <ul>
                {products.map(data => (
                    <li key={data.id} > {data.furniture_name} - {data.description}</li>
                ))}
            </ul>
            <button onClick={goToHomePage}>Go to HomePage</button>
        </div>
        </Layout>
    );
}

export default ProductsPage;