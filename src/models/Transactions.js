import { transactionsDB } from '../db/pouchdb';
import { v4 as uuidv4 } from 'uuid';


// Create
export const addTransaction = async (transaction) => {
  try {
    const response = await transactionsDB.put({
      _id: uuidv4(),
      ...transaction,
      date: new Date().toISOString(),
    });
    return response;
  } catch (err) {
    console.error('Error adding transaction:', err);
  }
};

// Read All
export const getAllTransactions = async () => {
  try {
    const result = await transactionsDB.allDocs({ include_docs: true });
    return result.rows.map((row) => row.doc);
  } catch (err) {
    console.error('Error fetching transactions:', err);
  }
};

// Delete
export const deleteTransaction = async (id) => {
  try {
    const transaction = await transactionsDB.get(id);
    const response = await transactionsDB.remove(transaction);
    return response;
  } catch (err) {
    console.error('Error deleting transaction:', err);
  }
};
