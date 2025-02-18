import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Checkout from './Checkout';

const mockStore = configureStore([]);
const initialState = {
    product: {
        cart: [
            { id: 1, name: 'Product 1', price: 10, quantity: 2 },
            { id: 2, name: 'Product 2', price: 20, quantity: 1 }
        ]
    },
    auth: {
        user: { name: 'John Doe', email: 'john@example.com' }
    }
};

describe('Checkout Component', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore(initialState);
        store.dispatch = jest.fn();
    });

    test('renders user information and cart items', () => {
        render(
            <Provider store={store}>
                <Checkout />
            </Provider>
        );

        expect(screen.getByText('Checkout')).toBeInTheDocument();
        expect(screen.getByText('User Information')).toBeInTheDocument();
        expect(screen.getByText('Name: John Doe')).toBeInTheDocument();
        expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
        expect(screen.getByText('Your Cart')).toBeInTheDocument();
        expect(screen.getByText('Product 1 - $10 x 2')).toBeInTheDocument();
        expect(screen.getByText('Product 2 - $20 x 1')).toBeInTheDocument();
    });

    test('handles checkout process', () => {
        window.alert = jest.fn(); // Mock window.alert

        render(
            <Provider store={store}>
                <Checkout />
            </Provider>
        );

        const checkoutButton = screen.getByText('Proceed to Payment');
        fireEvent.click(checkoutButton);

        expect(window.alert).toHaveBeenCalledWith('Checkout process initiated!');
    });

    test('displays empty cart message', () => {
        store = mockStore({
            product: {
                cart: []
            },
            auth: {
                user: { name: 'John Doe', email: 'john@example.com' }
            }
        });

        render(
            <Provider store={store}>
                <Checkout />
            </Provider>
        );

        expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
    });

    test('prompts user to log in if not authenticated', () => {
        store = mockStore({
            product: {
                cart: [
                    { id: 1, name: 'Product 1', price: 10, quantity: 2 }
                ]
            },
            auth: {
                user: null
            }
        });

        render(
            <Provider store={store}>
                <Checkout />
            </Provider>
        );

        expect(screen.getByText('Please log in to proceed with checkout.')).toBeInTheDocument();
    });
});