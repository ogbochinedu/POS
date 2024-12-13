import { useState, useEffect } from 'react';
import { transactionsDB } from '../db/pouchdb';
import { v4 as uuidv4 } from 'uuid';

// Custom hook for transaction management
const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all transactions from the database
  const getAllTransactions = async () => {
    setLoading(true);
    try {
      const result = await transactionsDB.allDocs({ include_docs: true });
      setTransactions(result.rows.map((row) => row.doc));
    } catch (err) {
      setError('Error fetching transactions');
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new transaction
  const addTransaction = async (transaction) => {
    setLoading(true);
    try {
      const response = await transactionsDB.put({
        _id: uuidv4(), // Generate a unique ID for the transaction
        ...transaction,
        date: new Date().toISOString(),
      });
      await getAllTransactions(); // Refresh the list after adding the transaction
    } catch (err) {
      setError('Error adding transaction');
      console.error('Error adding transaction:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a transaction by ID
  const deleteTransaction = async (id) => {
    setLoading(true);
    try {
      const transaction = await transactionsDB.get(id);
      const response = await transactionsDB.remove(transaction);
      await getAllTransactions(); // Refresh the list after deleting the transaction
    } catch (err) {
      setError('Error deleting transaction');
      console.error('Error deleting transaction:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch transactions when the component mounts
  useEffect(() => {
    getAllTransactions();
  }, []);

  return {
    transactions,
    loading,
    error,
    addTransaction,
    deleteTransaction,
  };
};

export default useTransactions;
