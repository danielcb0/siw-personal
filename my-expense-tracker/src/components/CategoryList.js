import React, { useEffect, useState } from 'react';
import { getCategories } from '../services/categoryService';

function CategoryList() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await getCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div>
            <h1>Categories</h1>
            {categories.map(category => (
                <div key={category.categoryId}>
                    <h2>{category.title}</h2>
                    <p>{category.description}</p>
                </div>
            ))}
        </div>
    );
}

export default CategoryList;
