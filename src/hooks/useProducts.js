import { useState, useEffect } from 'react';
import { productsDB } from '../db/pouchdb';
import { v4 as uuidv4 } from 'uuid';

// Custom hook for product management
const useProducts = () => {
  const [productsValue, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all products from the database
  const getAllProducts = async () => {
    setLoading(true);
    try {
      const result = await productsDB.allDocs({ include_docs: true });
      setProducts(result.rows.map((row) => row.doc));
    } catch (err) {
      setError('Error fetching products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new product
  const addProduct = async (product) => {
    setLoading(true);
    try {
      const response = await productsDB.put({
        _id: product.id, // Generate a unique ID for the product
        ...product,
        createdAt: new Date().toISOString(),
      });
      await getAllProducts(); // Refresh the list after adding the product
    } catch (err) {
      setError('Error adding product');
      console.error('Error adding product:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update an existing product
  const updateProduct = async (id, updatedProduct) => {
    setLoading(true);
    try {
      const product = await productsDB.get(id);
      const response = await productsDB.put({
        ...product,
        ...updatedProduct,
        updatedAt: new Date().toISOString(),
      });
      await getAllProducts(); // Refresh the list after updating the product
    } catch (err) {
      setError('Error updating product');
      console.error('Error updating product:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a product by ID
  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      const product = await productsDB.get(id);
      const response = await productsDB.remove(product);
      await getAllProducts(); // Refresh the list after deleting the product
    } catch (err) {
      setError('Error deleting product');
      console.error('Error deleting product:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch of products when the component mounts
  useEffect(() => {
    getAllProducts();
  }, []);

  return {
    productsValue,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProducts;
