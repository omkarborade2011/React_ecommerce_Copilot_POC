import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import './Home.css';
import productsData from '../data/products.json';

// Define a Product interface to type-check product properties
interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

const Home: React.FC = () => {
    // State to hold the array of products
    const [products, setProducts] = useState<Product[]>([]);
    // State to store the search term entered by the user
    const [searchTerm, setSearchTerm] = useState<string>('');

    // useEffect hook to load product data once the component mounts
    useEffect(() => {
        // Use the imported JSON data instead of fetching from an API
        setProducts(productsData);
    }, []);

    // Function to handle "Add to Cart" button click
    const handleAddToCart = (product: Product) => {
        // In a real application, dispatch a Redux action or update state to add the product to the cart.
        console.log('Product added to cart:', product);
    };

    // Filter products based on search term (case-insensitive)
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="home">
            {/* Main heading */}
            <h1>Welcome to Our E-Commerce Store</h1>
            {/* Subheading */}
            <h2>Featured Products</h2>

            {/* Search container for filtering products */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    // Update searchTerm state on change
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Container for the product cards */}
            <div className="product-list">
                {filteredProducts && filteredProducts.length > 0 ? (
                    // Map each filtered product to a ProductCard component
                    filteredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            // Pass the add to cart handler as a prop
                            onAddToCart={handleAddToCart}
                        />
                    ))
                ) : (
                    // Message displayed if there are no products available or match the search criteria
                    <p>No products available.</p>
                )}
            </div>
        </div>
    );
};

export default Home;