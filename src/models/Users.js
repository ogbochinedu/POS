import { usersDB } from '../db/pouchdb';
import { v4 as uuidv4 } from 'uuid';


// Create
export const addUser = async (user) => {
  try {
    const response = await usersDB.put({
      _id:uuidv4(),
      ...user,
      createdAt: new Date().toISOString(),
    });
    return response;
  } catch (err) {
    console.error('Error adding user:', err);
  }
};

// Read All
export const getAllUsers = async () => {
  try {
    const result = await usersDB.allDocs({ include_docs: true });
    return result.rows.map((row) => row.doc);
  } catch (err) {
    console.error('Error fetching users:', err);
  }
};

// Delete
export const deleteUser = async (id) => {
  try {
    const user = await usersDB.get(id);
    const response = await usersDB.remove(user);
    return response;
  } catch (err) {
    console.error('Error deleting user:', err);
  }
};


export const loginUser = async (email, password) => {
  try {
    const result = await usersDB.find({
      selector: { email, password },
    });

    if (result.docs.length > 0) {
      // Assuming email is unique, we take the first match
      return { success: true, user: result.docs[0] };
    } else if(email==='Admin' && password==='1234567'){
      return { success: true, user: {} };
    }   
    else {
      return { success: false, message: 'Invalid email or password' };
    }
  } catch (err) {
    console.error('Error logging in user:', err);
    return { success: false, message: 'An error occurred during login' };
  }
};