import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useCart } from './CartContext'; 
import Layout from '../Layout';
import './style.cart.css'; 

const CartPage = () => {
    const { cartItems, removeFromCart } = useCart();
    const navigate = useNavigate(); 

    const handleProceedToCheckout = () => {
        navigate('/checkout'); 
    };

    return (
      <Layout>
        <div>
            <h2>Your Cart</h2>
            {cartItems.length > 0 ? (
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.title} style={{ maxWidth: '100px', height: 'auto', marginRight: '20px' }} />
                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <p>Price: {item.price}</p>
                                <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
                            </div>
                        </div>
                    ))}
                    <button 
                        className="proceed-to-checkout-btn" 
                        onClick={handleProceedToCheckout}
                        style={{ float: 'right', marginTop: '20px' }} 
                    >
                        Proceed to Checkout
                    </button>
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
      </Layout>
    );
};

export default CartPage;
