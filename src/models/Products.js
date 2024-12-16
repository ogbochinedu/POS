import { productsDB } from '../db/pouchdb';
import { v4 as uuidv4 } from 'uuid';

// Create
export const addProduct = async (product) => {
  try {
    // const response = await productsDB.put({
    //   _id: uuidv4(),
    //   ...product,
    //   createdAt: new Date().toISOString(),
    // });
    // return response;
    const existingProduct = await productsDB.get(product.id).catch(() => null);

    if (existingProduct) {
      // If the product exists, update the existing document
      const response = await productsDB.put({
        ...existingProduct, // Retain the existing revision
        ...product,         // Overwrite with new product data
        updatedAt: new Date().toISOString(), // Add/update a timestamp
      });
      return response;
    } else {
      // If the product doesn't exist, create a new document
      const response = await productsDB.put({
        _id: product.id || uuidv4(), // Use provided _id or generate a new one
        ...product,
        createdAt: new Date().toISOString(),
      });
      return response;
    }
  } catch (err) {
    console.error('Error adding product:', err);
  }
};

// Read All
export const getAllProducts = async () => {
  try {
    const result = await productsDB.allDocs({ include_docs: true });
    return result.rows.map((row) => row.doc);
  } catch (err) {
    console.error('Error fetching products:', err);
  }
};

// Update
export const updateProduct = async (id, updatedProduct) => {
  try {
    const product = await productsDB.get(id);
    const response = await productsDB.put({
      ...product,
      ...updatedProduct,
      updatedAt: new Date().toISOString(),
    });
    return response;
  } catch (err) {
    console.error('Error updating product:', err);
  }
};

// Delete
export const deleteProduct = async (id) => {
  try {
    const product = await productsDB.get(id);
    const response = await productsDB.remove(product);
    return response;
  } catch (err) {
    console.error('Error deleting product:', err);
  }
};
