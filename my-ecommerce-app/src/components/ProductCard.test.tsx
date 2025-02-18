import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from './ProductCard';
import { addToCart } from '../redux/actions/productActions';

const mockStore = configureStore([]);
const initialState = {};

jest.mock('../redux/actions/productActions', () => ({
    addToCart: jest.fn()
}));

const product = {
    id: 1,
    title: 'Product 1',
    price: 10,
    description: 'Description 1',
    category: 'Category 1',
    image: 'image1.jpg'
};

describe('ProductCard Component', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore(initialState);
        store.dispatch = jest.fn();
    });

    test('renders product details', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ProductCard product={product} onAddToCart={jest.fn()} />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('$10.00')).toBeInTheDocument();
    });

    test('handles card click', () => {
        const { container } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <ProductCard product={product} onAddToCart={jest.fn()} />
                </MemoryRouter>
            </Provider>
        );

        const productImage = container.querySelector('.product-image');
        fireEvent.click(productImage!);

        expect(window.location.pathname).toBe(`/product/${product.id}`);
    });

    test('handles add to cart button click', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ProductCard product={product} onAddToCart={jest.fn()} />
                </MemoryRouter>
            </Provider>
        );

        const addToCartButton = screen.getByText('Add to Cart');
        fireEvent.click(addToCartButton);

        expect(store.dispatch).toHaveBeenCalledWith(addToCart({ ...product, quantity: 1, name: '' }));
    });
});