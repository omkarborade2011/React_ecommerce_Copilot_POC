import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter, Route } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import { addToCart } from '../redux/actions/productActions';
import productsData from '../data/products.json';

const mockStore = configureStore([]);
const initialState = {};

jest.mock('../redux/actions/productActions', () => ({
    addToCart: jest.fn()
}));

describe('ProductDetail Component', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore(initialState);
        store.dispatch = jest.fn();
    });

    test('renders product details', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/product/1']}>
                    <Route path="/product/:id">
                        <ProductDetail />
                    </Route>
                </MemoryRouter>
            </Provider>
        );

        const product = productsData.find(p => p.id === 1);

        expect(screen.getByText(product?.title || '')).toBeInTheDocument();
        expect(screen.getByText(product?.description || '')).toBeInTheDocument();
        expect(screen.getByText(`Category: ${product?.category}`)).toBeInTheDocument();
        expect(screen.getByText(`Price: $${product?.price.toFixed(2)}`)).toBeInTheDocument();
        expect(screen.getByText(`Rating: ${product?.rating.rate} (${product?.rating.count} reviews)`)).toBeInTheDocument();
    });

    test('handles add to cart button click', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/product/1']}>
                    <Route path="/product/:id">
                        <ProductDetail />
                    </Route>
                </MemoryRouter>
            </Provider>
        );

        const addToCartButton = screen.getByText('Add to Cart');
        fireEvent.click(addToCartButton);

        const product = productsData.find(p => p.id === 1);
        expect(addToCart).toHaveBeenCalledWith({ ...product, quantity: 1, name: product?.title });
    });

    test('displays product not found message for invalid product id', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/product/999']}>
                    <Route path="/product/:id">
                        <ProductDetail />
                    </Route>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Product not found')).toBeInTheDocument();
    });
});