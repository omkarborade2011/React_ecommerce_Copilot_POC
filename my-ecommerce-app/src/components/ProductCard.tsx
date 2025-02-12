import React from 'react';
import { useHistory } from 'react-router-dom';
import { addToCart } from '../redux/actions/productActions';
import './ProductCard.css';
import { useDispatch } from 'react-redux';

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
    onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleCardClick = () => {
        history.push(`/product/${product.id}`);
    };

    const handleAddToCartClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
         dispatch(addToCart({
            ...product, quantity: 1,
            name: ''
        }));
    };

    return (
        <div className="product-card" >
            <img
                src={product.image}
                alt={product.title}
                className="product-image"
                onClick={handleCardClick}
            />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button className="add-to-cart-button" onClick={handleAddToCartClick}>
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;