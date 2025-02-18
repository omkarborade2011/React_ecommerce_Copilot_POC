import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';
import productsData from '../data/products.json';

jest.mock('../components/ProductCard', () => ({ product, onAddToCart }: any) => (
    <div data-testid="product-card">
        <h3>{product.title}</h3>
        <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
));

describe('Home Component', () => {
    test('renders welcome message and featured products', () => {
        render(<Home />);

        expect(screen.getByText('Welcome to Our E-Commerce Store')).toBeInTheDocument();
        expect(screen.getByText('Featured Products')).toBeInTheDocument();
        expect(screen.getAllByTestId('product-card').length).toBe(productsData.length);
    });

    test('filters products based on search term', () => {
        render(<Home />);

        const searchInput = screen.getByPlaceholderText('Search products...');
        fireEvent.change(searchInput, { target: { value: 'Product 1' } });

        expect(screen.getAllByTestId('product-card').length).toBe(1);
        expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    test('displays no products available message when no products match search term', () => {
        render(<Home />);

        const searchInput = screen.getByPlaceholderText('Search products...');
        fireEvent.change(searchInput, { target: { value: 'Nonexistent Product' } });

        expect(screen.getByText('No products available.')).toBeInTheDocument();
    });

    test('handles add to cart button click', () => {
        console.log = jest.fn();
        render(<Home />);

        const addToCartButton = screen.getAllByText('Add to Cart')[0];
        fireEvent.click(addToCartButton);

        expect(console.log).toHaveBeenCalledWith('Product added to cart:', productsData[0]);
    });
});