import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/productActions';
import './ProductCard.css';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({
            ...product, quantity: 1,
            name: ''
        }));
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