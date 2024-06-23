import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategory, updateCategory } from '../services/categoryService';

const EditCategory = () => {
    const { categoryId } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategory();
    }, []);

    const fetchCategory = async () => {
        try {
            const category = await getCategory(categoryId);
            setTitle(category.title);
            setDescription(category.description);
        } catch (error) {
            console.error('Failed to fetch category', error);
        }
    };

    const handleUpdate = async () => {
        try {
            await updateCategory(categoryId, title, description);
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to update category', error);
        }
    };

    return (
        <div>
            <h1>Edit Category</h1>
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
            <button onClick={handleUpdate}>Update Category</button>
        </div>
    );
};

export default EditCategory;
