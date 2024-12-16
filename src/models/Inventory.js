// import { inventoryDB } from '../db/pouchdb';
// import { v4 as uuidv4 } from 'uuid';

 
// // Create or Update Inventory
// export const saveInventory = async (productId, quantity) => {
//   try {
//     const existingInventory = await inventoryDB.get(`inventory_${productId}`).catch(() => null);
//     if (existingInventory) {
//       const response = await inventoryDB.put({
//         ...existingInventory,
//         quantity,
//         lastUpdated: new Date().toISOString(),
//       });
//       return response;
//     } else {
//       const response = await inventoryDB.put({
//         _id: uuidv4(),
//         productId,
//         quantity,
//         lastUpdated: new Date().toISOString(),
//       });
//       return response;
//     }
//   } catch (err) {
//     console.error('Error saving inventory:', err);
//   }
// };

// // Read All
// export const getAllInventory = async () => {
//   try {
//     const result = await inventoryDB.allDocs({ include_docs: true });
//     return result.rows.map((row) => row.doc);
//   } catch (err) {
//     console.error('Error fetching inventory:', err);
//   }
// };

// // Delete
// export const deleteInventory = async (productId) => {
//   try {
//     const inventory = await inventoryDB.get(`inventory_${productId}`);
//     const response = await inventoryDB.remove(inventory);
//     return response;
//   } catch (err) {
//     console.error('Error deleting inventory:', err);
//   }
// };

import { inventoryDB } from '../db/pouchdb';
import { v4 as uuidv4 } from 'uuid';

// Save or Update Inventory
export const saveInventory = async (productId, productData) => {
  try {
    const existingInventory = await inventoryDB.get(`inventory_${productId}`).catch(() => null);
    if (existingInventory) {
      // Update existing inventory
      const response = await inventoryDB.put({
        ...existingInventory,
        ...productData, // Merge new data
        lastUpdated: new Date().toISOString(),
      });
      return response;
    } else {
      // Create new inventory item
      const response = await inventoryDB.put({
        _id: `inventory_${productId}`,
        ...productData,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      });
      return response;
    }
  } catch (err) {
    console.error('Error saving inventory:', err);
  }
};

// Read All Inventory
export const getAllInventory = async () => {
  try {
    const result = await inventoryDB.allDocs({ include_docs: true });
    return result.rows.map((row) => row.doc);
  } catch (err) {
    console.error('Error fetching inventory:', err);
  }
};

// Get Inventory by Product ID
export const getInventoryById = async (productId) => {
  try {
    const inventory = await inventoryDB.get(`inventory_${productId}`);
    return inventory;
  } catch (err) {
    console.error('Error fetching inventory item:', err);
  }
};

// Delete Inventory
export const deleteInventory = async (productId) => {
  try {
    const inventory = await inventoryDB.get(`inventory_${productId}`);
    const response = await inventoryDB.remove(inventory);
    return response;
  } catch (err) {
    console.error('Error deleting inventory:', err);
  }
};

// Add Transaction History to Inventory
export const addTransaction = async (productId, transaction) => {
  try {
    const inventory = await inventoryDB.get(`inventory_${productId}`);
    if (!inventory.transactionHistory) {
      inventory.transactionHistory = [];
    }

    // Update quantity based on transaction type
    if (transaction.type === 'add') {
      inventory.quantity += transaction.quantity;
    } else if (transaction.type === 'remove' || transaction.type === 'usage') {
      if (inventory.quantity < transaction.quantity) {
        throw new Error('Insufficient stock');
      }
      inventory.quantity -= transaction.quantity;
    }

    // Add the transaction record
    inventory.transactionHistory.push({
      ...transaction,
      date: new Date().toISOString(),
    });

    // Save the updated inventory back to the database
    const response = await inventoryDB.put({
      ...inventory,
      lastUpdated: new Date().toISOString(),
    });
    return response;
  } catch (err) {
    console.error('Error adding transaction:', err);
  }
};

// Get Low-Stock Inventory
export const getLowStockItems = async (reorderLevel) => {
  try {
    const result = await inventoryDB.allDocs({ include_docs: true });
    return result.rows
      .map((row) => row.doc)
      .filter((doc) => doc.quantity <= reorderLevel);
  } catch (err) {
    console.error('Error fetching low-stock items:', err);
  }
};

