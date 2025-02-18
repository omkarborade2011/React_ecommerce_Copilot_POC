import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import App from './App';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail';

const mockStore = configureStore([]);
const initialState = {};

describe('App Component', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    test('renders Navbar and Footer', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('My E-Commerce')).toBeInTheDocument();
        expect(screen.getByText(/Accenture. All rights reserved./i)).toBeInTheDocument();
    });

    test('renders Home component for / route', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Welcome to Our E-Commerce Store')).toBeInTheDocument();
    });

    test('renders Login component for /login route', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/login']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    test('renders Cart component for /cart route', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/cart']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Your Shopping Cart')).toBeInTheDocument();
    });

    test('renders Checkout component for /checkout route', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/checkout']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Checkout')).toBeInTheDocument();
    });

    test('renders ProductDetail component for /product/:id route', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/product/1']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Product not found')).toBeInTheDocument();
    });
});