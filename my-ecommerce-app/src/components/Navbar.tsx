import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/reducers';
import './Navbar.css'; // Import the CSS file

const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    };

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
                    <Link to="/cart">Cart</Link>
                </li>
                {isAuthenticated ? (
                    <li>
                        <a href="#" onClick={handleLogout}>Logout</a>
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