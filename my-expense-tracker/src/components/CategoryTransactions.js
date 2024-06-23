import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTransactions, createTransaction, deleteTransaction, updateTransaction } from '../services/transactionService';

const CategoryTransactions = () => {
    const { categoryId } = useParams();
    const [transactions, setTransactions] = useState([]);
    const [newTransaction, setNewTransaction] = useState({ amount: '', note: '', transactionDate: '' });

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getTransactions(categoryId);
                setTransactions(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTransactions();
    }, [categoryId]);

    const handleChange = (e) => {
        setNewTransaction({
            ...newTransaction,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddTransaction = async () => {
        try {
            await createTransaction(categoryId, newTransaction);
            const data = await getTransactions(categoryId);
            setTransactions(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteTransaction = async (transactionId) => {
        try {
            await deleteTransaction(categoryId, transactionId);
            const data = await getTransactions(categoryId);
            setTransactions(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Transactions for Category {categoryId}</h2>
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction.transactionId}>
                        <span>Amount: {transaction.amount}, Note: {transaction.note}, Date: {new Date(transaction.transactionDate).toLocaleDateString()}</span>
                        <button onClick={() => handleDeleteTransaction(transaction.transactionId)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h3>Add Transaction</h3>
            <input type="number" name="amount" value={newTransaction.amount} onChange={handleChange} placeholder="Amount" required />
            <input type="text" name="note" value={newTransaction.note} onChange={handleChange} placeholder="Note" required />
            <input type="date" name="transactionDate" value={newTransaction.transactionDate} onChange={handleChange} required />
            <button onClick={handleAddTransaction}>Add Transaction</button>
        </div>
    );
};

export default CategoryTransactions;
