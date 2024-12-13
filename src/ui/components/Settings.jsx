import React, { useState } from 'react';
//import {getAllUsers,addUser,deleteUser} from '../../models/Users'
import useUsers from '../../hooks/useUsers'

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('user');
  const { users, loading, error, addUser, deleteUser } = useUsers();
  
  // Sample state for form data
  const [businessDetails, setBusinessDetails] = useState({
    storeName: '',
    address: '',
    phone: '',
    email: ''
  });

  const [taxRate, setTaxRate] = useState('');
  
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'staff',
    password:'1234567'
  });

  const [printerSettings, setPrinterSettings] = useState({
    printerName: '',
    type: 'receipt',
    isDefault: false
  });

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      addUser(newUser);
      setNewUser({ name: '', email: '', role: 'user' }); // Reset form
    }
  };
  const handleDeleteUser = (id) => {
    deleteUser(id);
  };
  //console.log(users)
  return (
    <div className="settings-container">
      <style>
        {`
          .settings-container {
            padding: 24px;
           
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }

          .settings-header {
            margin-bottom: 32px;
          }

          .settings-header h1 {
            font-size: 28px;
            color: #2c3e50;
            margin: 0 0 8px 0;
          }

          .tabs {
            display: flex;
            border-bottom: 1px solid #e2e8f0;
            margin-bottom: 24px;
          }

          .tab {
            padding: 12px 24px;
            cursor: pointer;
            border: none;
            background: none;
            font-size: 16px;
            color: #64748b;
            position: relative;
          }

          .tab.active {
            color: #3b82f6;
          }

          .tab.active::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            right: 0;
            height: 2px;
            background-color: #3b82f6;
          }

          .tab-content {
            display: none;
          }

          .tab-content.active {
            display: block;
          }

          .form-section {
            background: white;
            border-radius: 8px;
            padding: 24px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            margin-bottom: 24px;
          }

          .form-section h2 {
            font-size: 20px;
            margin: 0 0 16px 0;
            color: #2c3e50;
          }

          .form-group {
            margin-bottom: 20px;
          }

          .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: #4b5563;
          }

          .form-group input,
          .form-group select {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            font-size: 16px;
          }

          .form-group input:focus,
          .form-group select:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
          }

          .user-list {
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            margin-top: 16px;
          }

          .user-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
            border-bottom: 1px solid #e2e8f0;
          }

          .user-item:last-child {
            border-bottom: none;
          }

          .button {
            background-color: #3b82f6;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
          }

          .button:hover {
            background-color: #2563eb;
          }

          .button.secondary {
            background-color: #e2e8f0;
            color: #4b5563;
          }

          .button.secondary:hover {
            background-color: #cbd5e1;
          }

          .hardware-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 16px;
            margin-top: 16px;
          }

          .hardware-item {
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            padding: 16px;
          }

          .hardware-status {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 14px;
            margin-top: 8px;
          }

          .status-connected {
            background-color: #dcfce7;
            color: #166534;
          }

          .status-disconnected {
            background-color: #fee2e2;
            color: #991b1b;
          }
        `}
      </style>

      <div className="settings-header">
        <h1>Settings</h1>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'user' ? 'active' : ''}`}
          onClick={() => setActiveTab('user')}
        >
          User Management
        </button>
        <button 
          className={`tab ${activeTab === 'business' ? 'active' : ''}`}
          onClick={() => setActiveTab('business')}
        >
          Business Details
        </button>
        <button 
          className={`tab ${activeTab === 'tax' ? 'active' : ''}`}
          onClick={() => setActiveTab('tax')}
        >
          Tax Settings
        </button>
        <button 
          className={`tab ${activeTab === 'hardware' ? 'active' : ''}`}
          onClick={() => setActiveTab('hardware')}
        >
          Hardware
        </button>
      </div>

      <div className={`tab-content ${activeTab === 'user' ? 'active' : ''}`}>
        <div className="form-section">
          <h2>Add New User</h2>
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select 
              value={newUser.role}
              onChange={(e) => setNewUser({...newUser, role: e.target.value})}
            >
              <option value="staff">Staff</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {/* <button className="button">Add User</button> */}
          <button className="button" onClick={handleAddUser} disabled={loading}>
          {loading ? 'Saving...' : 'Add User'}
        </button>
        </div>

        <div className="form-section">
          <h2>Current Users</h2>
          <div className="user-list">
            
            {users.map((user) => (
        <div className="user-item">
        <div>
          <div>{user.name}</div>
          <div style={{ color: '#64748b' }}>{user.email}</div>
        </div>
        {/* <button className="button secondary">Remove</button> */}
        <button className="button secondary" onClick={() => handleDeleteUser(user._id)} disabled={loading}>
                {loading ? 'Deleting...' : 'Delete'}
              </button>
      </div>
        ))}
          </div>
        </div>
      </div>

      <div className={`tab-content ${activeTab === 'business' ? 'active' : ''}`}>
        <div className="form-section">
          <h2>Business Information</h2>
          <div className="form-group">
            <label>Store Name</label>
            <input 
              type="text"
              value={businessDetails.storeName}
              onChange={(e) => setBusinessDetails({...businessDetails, storeName: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input 
              type="text"
              value={businessDetails.address}
              onChange={(e) => setBusinessDetails({...businessDetails, address: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input 
              type="tel"
              value={businessDetails.phone}
              onChange={(e) => setBusinessDetails({...businessDetails, phone: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email"
              value={businessDetails.email}
              onChange={(e) => setBusinessDetails({...businessDetails, email: e.target.value})}
            />
          </div>
          <button className="button">Save Changes</button>
        </div>
      </div>

      <div className={`tab-content ${activeTab === 'tax' ? 'active' : ''}`}>
        <div className="form-section">
          <h2>Tax Configuration</h2>
          <div className="form-group">
            <label>Sales Tax Rate (%)</label>
            <input 
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              step="0.01"
            />
          </div>
          <button className="button">Update Tax Rate</button>
        </div>
      </div>

      <div className={`tab-content ${activeTab === 'hardware' ? 'active' : ''}`}>
        <div className="form-section">
          <h2>Add New Hardware</h2>
          <div className="form-group">
            <label>Printer Name</label>
            <input 
              type="text"
              value={printerSettings.printerName}
              onChange={(e) => setPrinterSettings({...printerSettings, printerName: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select
              value={printerSettings.type}
              onChange={(e) => setPrinterSettings({...printerSettings, type: e.target.value})}
            >
              <option value="receipt">Receipt Printer</option>
              <option value="label">Label Printer</option>
              <option value="barcode">Barcode Scanner</option>
            </select>
          </div>
          <button className="button">Add Device</button>
        </div>

        <div className="form-section">
          <h2>Connected Devices</h2>
          <div className="hardware-list">
            <div className="hardware-item">
              <h3>Main Receipt Printer</h3>
              <p>Type: Receipt Printer</p>
              <div className="hardware-status status-connected">Connected</div>
            </div>
            <div className="hardware-item">
              <h3>Barcode Scanner</h3>
              <p>Type: Scanner</p>
              <div className="hardware-status status-disconnected">Disconnected</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;