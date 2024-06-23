import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, handleLogout }) => {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        handleLogout();
        navigate('/login');
    };

    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/dashboard">Dashboard</Link></li>

                    {isLoggedIn && (
                        <li><button onClick={handleLogoutClick}>Log Out</button></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
