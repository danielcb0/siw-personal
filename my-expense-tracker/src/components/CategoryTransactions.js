// Importing necessary libraries and functions
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTransactions, createTransaction, deleteTransaction, updateTransaction } from '../services/transactionService'; // Importing service functions

// CategoryTransactions component
const CategoryTransactions = () => {
    // Extracting the categoryId from the URL parameters
    const { categoryId } = useParams();
    // State to store the list of transactions
    const [transactions, setTransactions] = useState([]);
    // State to store the new transaction being added
    const [newTransaction, setNewTransaction] = useState({ amount: '', note: '', transactionDate: '' });

    // useEffect hook to fetch transactions when the component mounts or categoryId changes
    useEffect(() => {
        // Async function to fetch transactions
        const fetchTransactions = async () => {
            try {
                // Calling getTransactions function to fetch transaction data for the category
                const data = await getTransactions(categoryId);
                // Updating the transactions state with the fetched data
                setTransactions(data);
            } catch (error) {
                // Logging any errors that occur during the fetch
                console.error(error);
            }
        };

        // Calling the fetchTransactions function
        fetchTransactions();
    }, [categoryId]); // Dependency array ensures this effect runs when categoryId changes

    // Function to handle input changes for new transaction
    const handleChange = (e) => {
        // Updating the newTransaction state with the changed input values
        setNewTransaction({
            ...newTransaction,
            [e.target.name]: e.target.value,
        });
    };

    // Function to handle adding a new transaction
    const handleAddTransaction = async () => {
        try {
            // Calling createTransaction function to add the new transaction
            await createTransaction(categoryId, newTransaction);
            // Fetching the updated list of transactions
            const data = await getTransactions(categoryId);
            // Updating the transactions state with the new data
            setTransactions(data);
            // Resetting the newTransaction state
            setNewTransaction({ amount: '', note: '', transactionDate: '' });
        } catch (error) {
            // Logging any errors that occur during the add operation
            console.error(error);
        }
    };

    // Function to handle deleting a transaction
    const handleDeleteTransaction = async (transactionId) => {
        try {
            // Calling deleteTransaction function to delete the specified transaction
            await deleteTransaction(categoryId, transactionId);
            // Fetching the updated list of transactions
            const data = await getTransactions(categoryId);
            // Updating the transactions state with the new data
            setTransactions(data);
        } catch (error) {
            // Logging any errors that occur during the delete operation
            console.error(error);
        }
    };

    return (
        <div>
            {/* Title for the transaction list */}
            <h2>Transactions for Category {categoryId}</h2>
            {/* Mapping over the transactions state to render each transaction */}
            <ul>
                {transactions.map(transaction => (
                    // Each transaction should have a unique key prop
                    <li key={transaction.transactionId}>
                        {/* Displaying transaction details */}
                        <span>Amount: {transaction.amount}, Note: {transaction.note}, Date: {new Date(transaction.transactionDate).toLocaleDateString()}</span>
                        {/* Button to delete the transaction */}
                        <button onClick={() => handleDeleteTransaction(transaction.transactionId)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h3>Add Transaction</h3>
            {/* Input fields for adding a new transaction */}
            <input type="number" name="amount" value={newTransaction.amount} onChange={handleChange} placeholder="Amount" required />
            <input type="text" name="note" value={newTransaction.note} onChange={handleChange} placeholder="Note" required />
            <input type="date" name="transactionDate" value={newTransaction.transactionDate} onChange={handleChange} required />
            {/* Button to add the new transaction */}
            <button onClick={handleAddTransaction}>Add Transaction</button>
        </div>
    );
};

// Exporting the CategoryTransactions component as the default export
export default CategoryTransactions;
