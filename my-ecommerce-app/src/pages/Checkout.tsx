import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface User {
    name: string;
    email: string;
}

const Checkout: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.product.cart);
    const user = useSelector((state: RootState) => state.auth.user);

    const handleCheckout = () => {
        // Handle the checkout process here
        alert('Checkout process initiated!');
    };

    return (
        <div className="checkout">
            <h2>Checkout</h2>
            {user ? (
                <div>
                    <h3>User Information</h3>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>Please log in to proceed with checkout.</p>
            )}
            <h3>Your Cart</h3>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            {item.name} - ${item.price} x {item.quantity}
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={handleCheckout} disabled={cartItems.length === 0}>
                Proceed to Payment
            </button>
        </div>
    );
};

export default Checkout;