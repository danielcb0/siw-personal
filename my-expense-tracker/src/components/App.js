import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import CategoryTransactions from './CategoryTransactions';
import PrivateRoute from '../utils/PrivateRoute';


const App = () => {
    return (
        <Router>
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
            </Routes>
        </Router>
    );
};

export default App;
