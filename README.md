# My E-commerce App

This is a simple e-commerce application built with React and Redux. It includes features such as user authentication, product browsing, a shopping cart, and a checkout process.

## Features

- User Login and Registration
- Product Catalogue
- Search Functionality
- Add to Cart
- View Cart
- Checkout Process
- Responsive Design

## Technologies Used

- React
- Redux
- React Router
- CSS

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v14 or later)
- npm (v5.6 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/my-ecommerce-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd my-ecommerce-app
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the application, run the following command:

```bash
npm start
```

The application will be running on `http://localhost:3000`.

## Usage

- Navigate through the application using the Navbar.
- Browse products in the Catalogue.
- Add products to your cart and proceed to checkout.

## Project Structure

Below is the project structure including the Git folder:

```
.git/                    # Git internals and config files
public/                  # Public static assets
src/                     
├── brand/               # Accenture brand assets (e.g., accentureTheme.css)
├── components/          # Shared/presentational components (Navbar, ProductCard, Footer, etc.)
├── pages/               # Page-level components (Home, Login, Cart, etc.)
├── redux/               # Redux setup (actions, reducers, store)
├── App.js               # Main App component
├── index.js             # Entry point to the application
└── index.css            # Global styling
tests/                   # End-to-end tests (Playwright)
.gitignore               # Git ignore file
package.json             # Project configuration and dependencies
README.md                # Project documentation (this file)
```

## Contributing

Contributions are welcome! Please create a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License.
