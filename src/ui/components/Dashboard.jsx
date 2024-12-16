import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import useTransactions from '../../hooks/useTransactions';

const Dashboard = () => {
  const { getDailySales,getMonthlySales,getTotalTransactionsToday}=useTransactions();
  // Sample data - in a real app, this would come from your backend
  const metrics = {
    dailySales: 2547.89,
    totalRevenue: 15789.32,
    transactions: 127,
    lowStockItems: 5
  };

 
  return (
    <div className="dashboard">
      <style>{`
        .dashboard {
          display: flex;
          flex-direction: column;
          height: 100vh; /* Fill the viewport height */
        
          padding: 24px;
          box-sizing: border-box;
          font-family: system-ui, -apple-system, sans-serif;
          background-color: #f9fafb;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .header h1 {
          font-size: 28px;
          margin: 0;
        }

        .settings-btn {
          padding: 8px 16px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.2s;
        }

        .settings-btn:hover {
          background: #e2e8f0;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }

        .metric-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .metric-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .metric-title {
          font-size: 14px;
          color: #64748b;
          margin: 0;
        }

        .metric-value {
          font-size: 24px;
          font-weight: bold;
          margin: 0;
        }

        .metric-subtitle {
          font-size: 12px;
          color: #94a3b8;
          margin: 4px 0 0 0;
        }

        .quick-actions {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .quick-actions h2 {
          font-size: 18px;
          margin: 0 0 16px 0;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 16px;
        }

        .action-btn {
          height: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          color: black !important;
        }

        .action-btn:hover {
          background: #f8fafc;
          transform: translateY(-2px);
        }

        .action-btn.primary {
          background: #3b82f6;
          color: white;
          border: none;
        }

        .action-btn.primary:hover {
          background: #2563eb;
        }

        .icon {
          width: 24px;
          height: 24px;
        }

        @media (max-width: 768px) {
          .dashboard {
            padding: 16px;
          }
          
          .metrics-grid {
            grid-template-columns: 1fr;
          }
          
          .actions-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <div className="header">
        <h1>Store Dashboard</h1>
        <Link  to="/settings" className="settings-btn">
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
          Settings
        </Link>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <h3 className="metric-title">Daily Sales</h3>
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
          </div>
          <p className="metric-value">₦{ getDailySales().toLocaleString()}</p>
          <p className="metric-subtitle">Today's total sales</p>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <h3 className="metric-title">Total Revenue</h3>
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 20V10M12 20V4M6 20v-6" />
            </svg>
          </div>
          <p className="metric-value">₦{getMonthlySales().toLocaleString()}</p>
          <p className="metric-subtitle">This month</p>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <h3 className="metric-title">Transactions</h3>
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
          <p className="metric-value">{getTotalTransactionsToday()}</p>
          <p className="metric-subtitle">Today's transactions</p>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <h3 className="metric-title">Low Stock Alert</h3>
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
          </div>
          <p className="metric-value">{metrics.lowStockItems}</p>
          <p className="metric-subtitle">Items need restock</p>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
      
          <Link to="/sales" className="action-btn primary">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            New Sale
          </Link>
          <Link  to="/inventory" className="action-btn">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            </svg>
            Inventory
          </Link>
          <Link  to="/transactionhistory" className="action-btn">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
              <path d="M13 3h-2a2 2 0 00-2 2v2h6V5a2 2 0 00-2-2z" />
              <path d="M9 12h6" />
              <path d="M9 16h6" />
            </svg>
            Transactions
          </Link>
          <Link   to="/inventory" className="action-btn">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


