import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

jest.mock('react-dom', () => ({ render: jest.fn() }));

describe('index.tsx', () => {
    test('renders App component', () => {
        const { container } = render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        expect(container).toBeDefined();
    });
});