import { useState, useEffect } from 'react';
import { usersDB } from '../db/pouchdb';
import { v4 as uuidv4 } from 'uuid';

// Custom hook for user management
const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all users from the database
  const getAllUsers = async () => {
    setLoading(true);
    try {
      const result = await usersDB.allDocs({ include_docs: true });
      setUsers(result.rows.map((row) => row.doc));
    } catch (err) {
      setError('Error fetching users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new user
  const addUser = async (user) => {
    setLoading(true);
    try {
      const response = await usersDB.put({
        _id: uuidv4(), // Generate a unique ID for the user
        ...user,
        createdAt: new Date().toISOString(),
      });
      await getAllUsers(); // Refresh the list after adding the user
    } catch (err) {
      setError('Error adding user');
      console.error('Error adding user:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a user by ID
  const deleteUser = async (id) => {
    setLoading(true);
    try {
      const user = await usersDB.get(id);
      const response = await usersDB.remove(user);
      await getAllUsers(); // Refresh the list after deleting the user
    } catch (err) {
      setError('Error deleting user');
      console.error('Error deleting user:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    getAllUsers();
  }, []);

  return {
    users,
    loading,
    error,
    addUser,
    deleteUser,
  };
};

export default useUsers;
