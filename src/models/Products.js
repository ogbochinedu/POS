// import { productsDB } from '../db/pouchdb';
// import { v4 as uuidv4 } from 'uuid';

// // Create
// export const addProduct = async (product) => {
//   try {
    
//     const existingProduct = await productsDB.get(product.id).catch(() => null);

//     if (existingProduct) {
//       // If the product exists, update the existing document
//       const response = await productsDB.put({
//         ...existingProduct, // Retain the existing revision
//         ...product,         // Overwrite with new product data
//         updatedAt: new Date().toISOString(), // Add/update a timestamp
//       });
//       return response;
//     } else {
//       // If the product doesn't exist, create a new document
//       const response = await productsDB.put({
//         _id: product.id || uuidv4(), // Use provided _id or generate a new one
//         ...product,
//         createdAt: new Date().toISOString(),
//       });
//       return response;
//     }
//   } catch (err) {
//     console.error('Error adding product:', err);
//   }
// };

// // Read All
// export const getAllProducts = async () => {
//   try {
//     const result = await productsDB.allDocs({ include_docs: true });
//     return result.rows.map((row) => row.doc);
//   } catch (err) {
//     console.error('Error fetching products:', err);
//   }
// };

// // Update
// export const updateProduct = async (id, updatedProduct) => {
//   try {
//     const product = await productsDB.get(id);
//     const response = await productsDB.put({
//       ...product,
//       ...updatedProduct,
//       updatedAt: new Date().toISOString(),
//     });
//     return response;
//   } catch (err) {
//     console.error('Error updating product:', err);
//   }
// };

// // Delete
// export const deleteProduct = async (id) => {
//   try {
//     const product = await productsDB.get(id);
//     const response = await productsDB.remove(product);
//     return response;
//   } catch (err) {
//     console.error('Error deleting product:', err);
//   }
// };


import { productsDB } from '../db/pouchdb';
import { v4 as uuidv4 } from 'uuid';

// Utility function for retrying operations with conflict resolution
const putWithRetry = async (doc, retries = 3) => {
  try {
    return await productsDB.put(doc, {force: true});
  } catch (err) {
    if (err.name === 'conflict' && retries > 0) {
      // Get the latest version of the document
      const latest = await productsDB.get(doc._id);
      // Merge the changes while keeping the latest _rev
      const mergedDoc = {
        ...latest,
        ...doc,
        _rev: latest._rev,
        updatedAt: new Date().toISOString()
      };
      return putWithRetry(mergedDoc, retries - 1);
    }
    throw err;
  }
};

// Create
export const addProduct = async (product) => {
  try {
    if (product.id) {
      // If ID exists, try to update existing product
      const existingProduct = await productsDB.get(product.id).catch(() => null);
      if (existingProduct) {
        const mergedProduct = {
          ...existingProduct,
          ...product,
          _id: product.id,
          updatedAt: new Date().toISOString()
        };
        return await putWithRetry(mergedProduct);
      }
    }
    
    // Create new product
    const newProduct = {
      _id: product.id || uuidv4(),
      ...product,
      createdAt: new Date().toISOString()
    };
    return await putWithRetry(newProduct);
  } catch (err) {
    console.error('Error adding product:', err);
    throw err; // Re-throw to handle in the component
  }
};

// Read All
export const getAllProducts = async () => {
  try {
    const result = await productsDB.allDocs({
      include_docs: true,
      attachments: true
    });
    return result.rows.map(row => row.doc);
  } catch (err) {
    console.error('Error fetching products:', err);
    throw err;
  }
};

// Update
export const updateProduct = async (id, updatedProduct) => {
  try {
    const existingProduct = await productsDB.get(id);
    const mergedProduct = {
      ...existingProduct,
      ...updatedProduct,
      _id: id,
      _rev: existingProduct._rev,
      updatedAt: new Date().toISOString()
    };
    return await putWithRetry(mergedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    throw err;
  }
};

// Delete
export const deleteProduct = async (id) => {
  try {
    const doc = await productsDB.get(id);
    return await productsDB.remove(doc);
  } catch (err) {
    if (err.name === 'conflict') {
      // If there's a conflict, get the latest version and try again
      const latestDoc = await productsDB.get(id, { conflicts: true });
      return await productsDB.remove(latestDoc);
    }
    console.error('Error deleting product:', err);
    throw err;
  }
};