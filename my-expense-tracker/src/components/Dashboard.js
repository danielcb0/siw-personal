// Importing necessary libraries and functions
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCategories, deleteCategory, createCategory } from '../services/categoryService';

// Dashboard component
const Dashboard = () => {
    // State to store the list of categories
    const [categories, setCategories] = useState([]);
    // State to store the new category title
    const [title, setTitle] = useState('');
    // State to store the new category description
    const [description, setDescription] = useState('');
    // Hook to navigate programmatically
    const navigate = useNavigate();

    // useEffect hook to fetch categories when the component mounts
    useEffect(() => {
        fetchCategories();
    }, []);

    // Async function to fetch categories from the API
    const fetchCategories = async () => {
        try {
            // Calling getCategories function to fetch category data
            const data = await getCategories();
            // Updating the categories state with the fetched data
            setCategories(data);
        } catch (error) {
            // Logging any errors that occur during the fetch
            console.error('Failed to fetch categories', error);
        }
    };

    // Function to handle category deletion
    const handleDelete = async (categoryId) => {
        try {
            // Calling deleteCategory function to delete the specified category
            await deleteCategory(categoryId);
            // Refreshing categories after deletion
            fetchCategories();
        } catch (error) {
            // Logging any errors that occur during the delete operation
            console.error('Failed to delete category', error);
        }
    };

    // Function to handle adding a new category
    const handleAddCategory = async () => {
        try {
            // Calling createCategory function to add the new category
            await createCategory(title, description);
            // Resetting the title and description states
            setTitle('');
            setDescription('');
            // Refreshing categories after adding
            fetchCategories();
        } catch (error) {
            // Logging any errors that occur during the add operation
            console.error('Failed to add category', error);
        }
    };

    return (
        <div>
            {/* Title for the dashboard */}
            <h1>Dashboard</h1>
            <div className="categories">
                {/* Title for the category list */}
                <h2>Categories</h2>
                {/* Mapping over the categories state to render each category */}
                <ul>
                    {categories.map(category => (
                        // Each category should have a unique key prop
                        <li key={category.categoryId}>
                            {/* Link to the category's transactions */}
                            <Link to={`/categories/${category.categoryId}`}>
                                {category.title}
                            </Link>
                            {/* Button to delete the category */}
                            <button onClick={() => handleDelete(category.categoryId)}>Delete</button>
                            {/* Button to navigate to the edit category page */}
                            <button onClick={() => navigate(`/edit-category/${category.categoryId}`)}>Edit</button>
                        </li>
                    ))}
                </ul>
                <h3>Add Category</h3>
                {/* Input fields for adding a new category */}
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {/* Button to add the new category */}
                <button onClick={handleAddCategory}>Add Category</button>
            </div>
        </div>
    );
};

// Exporting the Dashboard component as the default export
export default Dashboard;
