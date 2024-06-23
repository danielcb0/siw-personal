import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import CategoryTransactions from './CategoryTransactions';
import EditCategory from './EditCategory';
import PrivateRoute from '../utils/PrivateRoute';
import Header from './Header'; // Asegúrate de que esté importado

import '../styles.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <div className="container">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } />
                    <Route path="/categories/:categoryId" element={
                        <PrivateRoute>
                            <CategoryTransactions />
                        </PrivateRoute>
                    } />
                    <Route path="/edit-category/:categoryId" element={
                        <PrivateRoute>
                            <EditCategory />
                        </PrivateRoute>
                    } />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
