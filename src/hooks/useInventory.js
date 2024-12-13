import { useState, useEffect } from 'react';
import { inventoryDB } from '../db/pouchdb';
import { v4 as uuidv4 } from 'uuid';

// Custom hook for inventory management
const useInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all inventory items
  const getAllInventory = async () => {
    setLoading(true);
    try {
      const result = await inventoryDB.allDocs({ include_docs: true });
      setInventory(result.rows.map((row) => row.doc));
    } catch (err) {
      setError('Error fetching inventory');
      console.error('Error fetching inventory:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add or update an inventory item
  const saveInventory = async (productId, quantity) => {
    setLoading(true);
    try {
      const existingInventory = await inventoryDB
        .get(`inventory_${productId}`)
        .catch(() => null);

      if (existingInventory) {
        // Update existing inventory
        await inventoryDB.put({
          ...existingInventory,
          quantity,
          lastUpdated: new Date().toISOString(),
        });
      } else {
        // Create new inventory entry
        await inventoryDB.put({
          _id: uuidv4(), // Generate a unique ID
          productId,
          quantity,
          lastUpdated: new Date().toISOString(),
        });
      }
      await getAllInventory(); // Refresh the inventory list
    } catch (err) {
      setError('Error saving inventory');
      console.error('Error saving inventory:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete an inventory item by productId
  const deleteInventory = async (productId) => {
    setLoading(true);
    try {
      const inventoryItem = await inventoryDB.get(`inventory_${productId}`);
      await inventoryDB.remove(inventoryItem);
      await getAllInventory(); // Refresh the inventory list
    } catch (err) {
      setError('Error deleting inventory');
      console.error('Error deleting inventory:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch of inventory when the component mounts
  useEffect(() => {
    getAllInventory();
  }, []);

  return {
    inventory,
    loading,
    error,
    saveInventory,
    deleteInventory,
  };
};

export default useInventory;
