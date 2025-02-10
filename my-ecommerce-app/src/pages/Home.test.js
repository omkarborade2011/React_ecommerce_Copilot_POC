import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home';

const mockProducts = [
    { id: 1, title: 'Product One', image: 'https://example.com/image1.jpg', price: 10.0 },
    { id: 2, title: 'Product Two', image: 'https://example.com/image2.jpg', price: 20.0 }
];

beforeAll(() => {
    // Mock the global fetch API
    jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(mockProducts)
        })
    );
});

afterAll(() => {
    jest.restoreAllMocks();
});

test('renders Home component and displays products after fetch', async () => {
    render(<Home />);
    
    // Check that the welcome header is rendered
    expect(screen.getByText(/welcome to our e-commerce store/i)).toBeInTheDocument();
    
    // Wait for fetched products to be rendered
    await waitFor(() => {
        expect(screen.getByText(/product one/i)).toBeInTheDocument();
        expect(screen.getByText(/product two/i)).toBeInTheDocument();
    });
});