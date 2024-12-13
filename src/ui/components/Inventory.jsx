import React, { useState } from 'react';
import { PlusCircle, Edit, AlertTriangle, Search } from 'lucide-react';

const InventoryManagement = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Coffee Beans', category: 'Beverages', price: 15.99, stock: 50, threshold: 10 },
    { id: 2, name: 'Tea Bags', category: 'Beverages', price: 5.99, stock: 8, threshold: 15 },
    { id: 3, name: 'Cookies', category: 'Snacks', price: 3.99, stock: 25, threshold: 20 },
  ]);

  const [categories] = useState(['Beverages', 'Snacks', 'Meals', 'Desserts']);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialFormState = {
    name: '',
    category: '',
    price: '',
    stock: '',
    threshold: '',
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedProduct) {
      setProducts(products.map(p =>
        p.id === selectedProduct.id ? { ...formData, id: p.id } : p
      ));
    } else {
      setProducts([...products, { ...formData, id: products.length + 1 }]);
    }
    setFormData(initialFormState);
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData(product);
    setIsModalOpen(true);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="inventory-container">
      <div className="inventory-card">
        <div className="card-header">
          <h2>Inventory Management</h2>
          <button 
            className="add-button"
            onClick={() => {
              setSelectedProduct(null);
              setFormData(initialFormState);
              setIsModalOpen(true);
            }}
          >
            <PlusCircle className="icon" />
            Add Product
          </button>
        </div>

        <div className="card-content">
          {/* <div className="filters">
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div> */}
          <div className="filters" style={{
  display: 'flex', 
  flexWrap: 'wrap', 
  gap: '10px', 
  maxWidth: '100%', 
  overflow: 'hidden', 
  boxSizing: 'border-box', 
}}>
  <div className="search-container" style={{
    position: 'relative', 
    flex: '1', 
    minWidth: '200px', 
    maxWidth: '100%', 
    boxSizing: 'border-box',
  }}>
    <Search className="search-icon" style={{
      position: 'absolute', 
      left: '10px', 
      top: '50%', 
      transform: 'translateY(-50%)', 
      color: '#666',
      pointerEvents: 'none',
    }} />
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-input"
      style={{
        width: '100%', 
        padding: '10px 10px 10px 35px', 
        border: '2px solid #ddd', 
        borderRadius: '5px', 
        fontSize: '14px', 
        outline: 'none',
        boxSizing: 'border-box'
      }}
    />
  </div>
  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="category-select"
    style={{
      flex: '1', 
      minWidth: '150px', 
      maxWidth: '100%', 
      padding: '10px', 
      border: '2px solid #ddd', 
      borderRadius: '5px', 
      fontSize: '14px', 
      outline: 'none',
      boxSizing: 'border-box',
    }}
  >
    <option value="all">All Categories</option>
    {categories.map(category => (
      <option key={category} value={category}>{category}</option>
    ))}
  </select>
</div>


          <table className="inventory-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td className="product-name">
                    {product.name}
                    {product.stock <= product.threshold && (
                      <span className="low-stock-badge">
                        <AlertTriangle className="icon" />
                        Low Stock
                      </span>
                    )}
                  </td>
                  <td>{product.category}</td>
                  <td>₦{product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit className="icon" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{selectedProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button 
                className="close-button"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-group">
                <input
                  name="name"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  name="stock"
                  type="number"
                  placeholder="Stock Quantity"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  name="threshold"
                  type="number"
                  placeholder="Low Stock Threshold"
                  value={formData.threshold}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
              <button type="submit" className="submit-button">
                {selectedProduct ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .inventory-container {
          padding: 24px;
        
         
        }

        .inventory-card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #eee;
        }

        .card-header h2 {
          margin: 0;
          font-size: 1.5rem;
          color: #333;
        }

        .card-content {
          padding: 20px;
        }

        .filters {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
        }

        .search-container {
          position: relative;
          flex: 1;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          color: #666;
        }

        .search-input {
          width: 100%;
          padding: 8px 8px 8px 36px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }

        .category-select {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          min-width: 160px;
          font-size: 14px;
        }

        .inventory-table {
          width: 100%;
          border-collapse: collapse;
        }

        .inventory-table th,
        .inventory-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        .inventory-table th {
          font-weight: 600;
          color: #666;
        }

        .product-name {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .low-stock-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 8px;
          background: #fee2e2;
          color: #dc2626;
          border-radius: 4px;
          font-size: 12px;
          gap: 4px;
        }

        .low-stock-badge .icon {
          width: 12px;
          height: 12px;
        }

        .add-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }

        .add-button:hover {
          background: #1d4ed8;
        }

        .edit-button {
          padding: 6px;
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
        }

        .edit-button:hover {
          color: #2563eb;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal {
          background: white;
          border-radius: 8px;
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          padding: 20px;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 1.25rem;
          color: #333;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 24px;
          color: #666;
          cursor: pointer;
        }

        .product-form {
          padding: 20px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-input,
        .form-select {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }

        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: #2563eb;
        }

        .submit-button {
          width: 100%;
          padding: 10px;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }

        .submit-button:hover {
          background: #1d4ed8;
        }

        .icon {
          width: 16px;
          height: 16px;
        }
      `}</style>
    </div>
  );
};

export default InventoryManagement;