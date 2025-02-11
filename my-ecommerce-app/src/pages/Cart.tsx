import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/actions/productActions';
import './Cart.css';

interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

interface RootState {
    product: {
        cart: CartItem[];
    };
}

const Cart: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.product.cart);
    console.log("cartItems :", cartItems);
    const dispatch = useDispatch();

    const handleRemove = (id: number) => {
        dispatch(removeFromCart({ id }));
    };

    const handleQuantityChange = (id: number, quantity: number) => {
        dispatch(updateQuantity(id, quantity));
    };

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="cart">
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.title} />
                            <div>
                                <h3>{item.title}</h3>
                                <p>Price: ${item.price}</p>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                    min="1"
                                />
                                <button onClick={() => handleRemove(item.id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                    <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
                    <button>Proceed to Checkout</button>
                </div>
            )}
        </div>
    );
};

export default Cart;