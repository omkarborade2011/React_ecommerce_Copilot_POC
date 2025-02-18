import React from 'react';
import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import { screen } from '@testing-library/dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Cart from './Cart';
import { removeFromCart, updateQuantity } from '../redux/actions/productActions';

const mockStore = configureStore([]);
const initialState = {
    product: {
        cart: [
            { id: 1, title: 'Product 1', price: 10, quantity: 2, image: 'image1.jpg' },
            { id: 2, title: 'Product 2', price: 20, quantity: 1, image: 'image2.jpg' }
        ]
    }
};

jest.mock('../redux/actions/productActions', () => ({
    removeFromCart: jest.fn(),
    updateQuantity: jest.fn()
}));

describe('Cart Component', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore(initialState);
        store.dispatch = jest.fn();
    });

    test('renders cart items', () => {
        render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );

        expect(screen.getByText('Your Shopping Cart')).toBeInTheDocument();
        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('Product 2')).toBeInTheDocument();
        expect(screen.getByText('Total Amount: $40.00')).toBeInTheDocument();
    });

    test('handles quantity change', () => {
        render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );

        const quantityInput = screen.getAllByRole('spinbutton')[0];
        fireEvent.change(quantityInput, { target: { value: '3' } });

        expect(updateQuantity).toHaveBeenCalledWith(1, 3);
    });

    test('handles remove item', () => {
        render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );

        const removeButton = screen.getAllByText('Remove')[0];
        fireEvent.click(removeButton);

        expect(removeFromCart).toHaveBeenCalledWith({ id: 1 });
    });

    test('displays empty cart message', () => {
        store = mockStore({
            product: {
                cart: []
            }
        });

        render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );

        expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
    });
});