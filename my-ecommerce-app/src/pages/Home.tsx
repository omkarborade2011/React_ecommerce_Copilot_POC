import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import './Home.css';
import productsData from '../data/products.json';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        // Use the imported JSON data instead of fetching from an API
        setProducts(productsData);
    }, []);

    const handleAddToCart = (product: Product) => {
        // Add the product to the cart (implement your cart logic here)
        console.log('Product added to cart:', product);
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="home">
            <h1>Welcome to Our E-Commerce Store</h1>
            <h2>Featured Products</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="product-list">
                {filteredProducts && filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
        </div>
    );
};

export default Home;