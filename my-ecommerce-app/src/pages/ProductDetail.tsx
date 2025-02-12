import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import productsData from '../data/products.json';
import { addToCart } from '../redux/actions/productActions';
import './ProductDetail.css';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const product = productsData.find(p => p.id === parseInt(id));
    const dispatch = useDispatch();

    if (!product) {
        return <div className="product-not-found">Product not found</div>;
    }

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity: 1, name: product.title }));
    };

    return (
        <div className="product-detail">
            <div className="product-image-container">
                <img src={product.image} alt={product.title} className="product-image" />
            </div>
            <div className="product-info">
                <h1 className="product-title">{product.title}</h1>
                <p className="product-description">{product.description}</p>
                <p className="product-category"><strong>Category:</strong> {product.category}</p>
                <p className="product-price"><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                <p className="product-rating">
                    <strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)
                </p>
                <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductDetail;