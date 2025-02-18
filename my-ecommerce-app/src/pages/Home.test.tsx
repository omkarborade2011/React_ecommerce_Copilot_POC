import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';
import productsData from '../data/products.json';

// Mock the ProductCard component so that tests focus on Home.tsx functionality.
// This mock renders a simple div with product title and an "Add to Cart" button.
jest.mock('../components/ProductCard', () => (props: any) => {
  return (
    <div data-testid="product-card">
      <h3>{props.product.title}</h3>
      <button onClick={() => props.onAddToCart(props.product)}>Add to Cart</button>
    </div>
  );
});

describe('Home Component', () => {
  beforeEach(() => {
    render(<Home />);
  });

  test('renders main headings', () => {
    // Check if the main heading is present.
    expect(screen.getByText(/Welcome to Our E-Commerce Store/i)).toBeInTheDocument();
    // Check if the subheading is present.
    expect(screen.getByText(/Featured Products/i)).toBeInTheDocument();
  });

  test('renders product cards based on productsData', () => {
    // Expect the number of rendered product cards to be equal to productsData length.
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards.length).toBe(productsData.length);
  });

  test('clicking Add to Cart button triggers handleAddToCart', () => {
    // Spy on console.log since handleAddToCart logs the product.
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    // Get the first "Add to Cart" button from the rendered product cards.
    const addToCartButtons = screen.getAllByText(/Add to Cart/i);
    fireEvent.click(addToCartButtons[0]);

    // Expect that console.log was called with the product details.
    expect(logSpy).toHaveBeenCalled();
    logSpy.mockRestore();
  });
});