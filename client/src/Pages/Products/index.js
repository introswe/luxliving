import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Layout';

function ProductsPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/products')
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