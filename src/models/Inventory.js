import { inventoryDB } from '../db/pouchdb';
import { v4 as uuidv4 } from 'uuid';


// Create or Update Inventory
export const saveInventory = async (productId, quantity) => {
  try {
    const existingInventory = await inventoryDB.get(`inventory_${productId}`).catch(() => null);
    if (existingInventory) {
      const response = await inventoryDB.put({
        ...existingInventory,
        quantity,
        lastUpdated: new Date().toISOString(),
      });
      return response;
    } else {
      const response = await inventoryDB.put({
        _id: uuidv4(),
        productId,
        quantity,
        lastUpdated: new Date().toISOString(),
      });
      return response;
    }
  } catch (err) {
    console.error('Error saving inventory:', err);
  }
};

// Read All
export const getAllInventory = async () => {
  try {
    const result = await inventoryDB.allDocs({ include_docs: true });
    return result.rows.map((row) => row.doc);
  } catch (err) {
    console.error('Error fetching inventory:', err);
  }
};

// Delete
export const deleteInventory = async (productId) => {
  try {
    const inventory = await inventoryDB.get(`inventory_${productId}`);
    const response = await inventoryDB.remove(inventory);
    return response;
  } catch (err) {
    console.error('Error deleting inventory:', err);
  }
};
