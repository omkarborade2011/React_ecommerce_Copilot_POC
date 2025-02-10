import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/productActions';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    return (
        <div className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button onClick={handleAddToCart} className="add-to-cart-button">
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;