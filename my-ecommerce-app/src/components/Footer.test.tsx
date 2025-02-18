import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
    test('renders footer content', () => {
        render(<Footer />);

        expect(screen.getByText(/Accenture. All rights reserved./i)).toBeInTheDocument();
        expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
        expect(screen.getByText(/Terms of Service/i)).toBeInTheDocument();
    });

    test('renders current year', () => {
        render(<Footer />);

        const currentYear = new Date().getFullYear();
        expect(screen.getByText(`© ${currentYear} Accenture. All rights reserved.`)).toBeInTheDocument();
    });

    test('renders privacy policy link', () => {
        render(<Footer />);

        const privacyPolicyLink = screen.getByText(/Privacy Policy/i);
        expect(privacyPolicyLink).toBeInTheDocument();
        expect(privacyPolicyLink).toHaveAttribute('href', '/privacy-policy');
    });

    test('renders terms of service link', () => {
        render(<Footer />);

        const termsOfServiceLink = screen.getByText(/Terms of Service/i);
        expect(termsOfServiceLink).toBeInTheDocument();
        expect(termsOfServiceLink).toHaveAttribute('href', '/terms-of-service');
    });
});