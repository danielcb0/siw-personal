import React, { useEffect, useState } from 'react';
import { getCategories, createCategory } from '../services/categoryService';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ title: '', description: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error(error);
                navigate('/login'); // Redirigir a login si hay un error
            }
        };

        fetchCategories();
    }, [navigate]);

    const handleChange = (e) => {
        setNewCategory({
            ...newCategory,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddCategory = async () => {
        try {
            await createCategory(newCategory);
            const data = await getCategories();
            setCategories(data);
            setNewCategory({ title: '', description: '' });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Categories</h2>
            <ul>
                {categories.map(category => (
                    <li key={category.categoryId}>
                        <Link to={`/categories/${category.categoryId}`}>{category.title}</Link>
                    </li>
                ))}
            </ul>
            <h3>Add Category</h3>
            <input
                type="text"
                name="title"
                value={newCategory.title}
                onChange={handleChange}
                placeholder="Title"
                required
            />
            <input
                type="text"
                name="description"
                value={newCategory.description}
                onChange={handleChange}
                placeholder="Description"
                required
            />
            <button onClick={handleAddCategory}>Add Category</button>
        </div>
    );
};

export default Dashboard;
