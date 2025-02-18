import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Mock useDispatch from react-redux
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

// Mock useHistory from react-router-dom
const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockPush,
  }),
}));

describe('Login Component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    mockPush.mockClear();
    mockDispatch.mockClear();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  test('renders login form with email and password inputs', () => {
    render(<Login />);
    
    // Check for heading and form fields
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  test('submits form: dispatches login action and redirects to "/"', () => {
    render(<Login />);
    
    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const submitButton = screen.getByRole('button', { name: /Login/i });

    // Simulate user typing into form fields
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    // Simulate form submit by clicking the login button
    fireEvent.click(submitButton);

    // Assert that dispatch was called (with the login action, argument details depend on your authActions implementation)
    expect(mockDispatch).toHaveBeenCalled();
    // Assert that after login, history.push was called with '/'
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});