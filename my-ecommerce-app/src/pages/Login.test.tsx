import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Login from './Login';
import { login } from '../redux/actions/authActions';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);
const initialState = {};

jest.mock('../redux/actions/authActions', () => ({
    login: jest.fn()
}));

describe('Login Component', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore(initialState);
        store.dispatch = jest.fn();
    });

    test('renders login form', () => {
        render(
            <Provider store={store}>
                <Login />
            </Provider>
        );

        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByLabelText('Email:')).toBeInTheDocument();
        expect(screen.getByLabelText('Password:')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    test('handles form submission', () => {
        render(
            <Provider store={store}>
                <Login />
            </Provider>
        );

        const emailInput = screen.getByLabelText('Email:');
        const passwordInput = screen.getByLabelText('Password:');
        const loginButton = screen.getByRole('button', { name: /login/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(loginButton);

        expect(store.dispatch).toHaveBeenCalledWith(login('test@example.com', 'password'));
    });

    test('displays validation errors', () => {
        render(
            <Provider store={store}>
                <Login />
            </Provider>
        );

        const loginButton = screen.getByRole('button', { name: /login/i });
        fireEvent.click(loginButton);

        expect(screen.getByLabelText('Email:')).toBeInvalid();
        expect(screen.getByLabelText('Password:')).toBeInvalid();
    });
});