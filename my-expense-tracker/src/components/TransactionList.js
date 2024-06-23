import React, { useState, useEffect } from 'react';
import { createTransaction, getTransactions } from '../services/transactionService';
import { useParams } from 'react-router-dom';

const TransactionList = () => {
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
            setNewTransaction({ amount: '', note: '', transactionDate: '' });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Transactions</h2>
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction.transactionId}>
                        Amount: {transaction.amount}, Note: {transaction.note}, Date: {new Date(transaction.transactionDate).toLocaleDateString()}
                    </li>
                ))}
            </ul>
            <h3>Add Transaction</h3>
            <input
                type="number"
                name="amount"
                value={newTransaction.amount}
                onChange={handleChange}
                placeholder="Amount"
                required
            />
            <input
                type="text"
                name="note"
                value={newTransaction.note}
                onChange={handleChange}
                placeholder="Note"
                required
            />
            <input
                type="date"
                name="transactionDate"
                value={newTransaction.transactionDate}
                onChange={handleChange}
                required
            />
            <button onClick={handleAddTransaction}>Add Transaction</button>
        </div>
    );
};

export default TransactionList;
