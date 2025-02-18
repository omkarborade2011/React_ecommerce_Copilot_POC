import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

const mockStore = configureStore([]);
const initialState = {
    auth: {
        isAuthenticated: false
    }
};

describe('Navbar Component', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore(initialState);
        store.dispatch = jest.fn();
    });

    test('renders navbar links', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('My E-Commerce')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Cart')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    test('renders logout link when authenticated', () => {
        store = mockStore({
            auth: {
                isAuthenticated: true
            }
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    test('handles logout click', () => {
        store = mockStore({
            auth: {
                isAuthenticated: true
            }
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </Provider>
        );

        const logoutLink = screen.getByText('Logout');
        fireEvent.click(logoutLink);

        expect(store.dispatch).toHaveBeenCalledWith({ type: 'LOGOUT' });
    });
});