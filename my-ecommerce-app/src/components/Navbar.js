import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">My E-Commerce</Link>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/catalogue">Catalogue</Link>
                </li>
                <li>
                    <Link to="/cart">Cart</Link>
                </li>
                {isAuthenticated ? (
                    <li>
                        <Link to="/logout">Logout</Link>
                    </li>
                ) : (
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;