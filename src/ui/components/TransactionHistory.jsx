import React, { useState,useEffect } from 'react';
import useTransactions from '../../hooks/useTransactions';
import Receipt from './print/receipt';

const TransactionHistory = () => {
    const {transactions,loading} = useTransactions(); 
    console.log(transactions,"use transactions")
    // Sample transaction data - in a real app, this would come from your backend
    const [transactions1] = useState([
        {
            id: '1',
            date: '2024-12-08',
            amount: 156.99,
            paymentMethod: 'Credit Card',
            cashier: 'John Doe',
            items: [
                { name: 'Product 1', quantity: 2, price: 49.99 },
                { name: 'Product 2', quantity: 1, price: 57.01 }
            ]
        },
        {
            id: '2',
            date: '2024-12-08',
            amount: 89.99,
            paymentMethod: 'Cash',
            cashier: 'Jane Smith',
            items: [
                { name: 'Product 3', quantity: 1, price: 89.99 }
            ]
        }
    ]);
   // const [transactions,setTransactions] = useState([]);

    // Filter states
    const [dateFilter, setDateFilter] = useState('');
    const [cashierFilter, setCashierFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Filter transactions based on search/filter criteria
    const filteredTransactions = transactions.filter(transaction => {
        const matchesDate = dateFilter ? transaction.date === dateFilter : true;
        const matchesCashier = cashierFilter ? 
            transaction.cashier.toLowerCase().includes(cashierFilter.toLowerCase()) : true;
        const matchesSearch = searchTerm ?
            transaction.items.some(item => 
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) : true;
        
        return matchesDate && matchesCashier && matchesSearch;
    });


    const [showReceiptModal, setShowReceiptModal] = useState(false);

    const [receiptData,setReceiptData] =useState();
    const [receiptLoaded,setReceiptLoaded] = useState(false);



    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString();
      };
  
 
    // Receipt generation
    const generateReceipt = (transaction) => {
        // Create receipt window
        // const receiptWindow = window.open('', '_blank');
        // receiptWindow.document.write(`
        //     <html>
        //         <head>
        //             <title>Receipt #${transaction._id}</title>
        //             <style>
        //                 body {
        //                     font-family: monospace;
        //                     padding: 20px;
        //                     max-width: 300px;
        //                     margin: 0 auto;
        //                 }
        //                 .header {
        //                     text-align: center;
        //                     margin-bottom: 20px;
        //                 }
        //                 .items {
        //                     border-top: 1px dashed #000;
        //                     border-bottom: 1px dashed #000;
        //                     padding: 10px 0;
        //                     margin: 10px 0;
        //                 }
        //                 .total {
        //                     text-align: right;
        //                     font-weight: bold;
        //                 }
        //             </style>
        //         </head>
        //         <body>
        //             <div class="header">
        //                 <h2>Store Receipt</h2>
        //                 <p>Date: ${transaction.date}</p>
        //                 <p>Transaction #${transaction._id}</p>
        //             </div>
        //             <div class="items">
        //                 ${transaction.items.map(item => `
        //                     <p>${item.name} x${item.quantity} - $${item.price}</p>
        //                 `).join('')}
        //             </div>
        //             <div class="total">
        //                 <p>Total: ₦${transaction.subtotal.toFixed(2)}</p>
        //                 <p>Payment Method: ${transaction.paymentMethod}</p>
        //             </div>
        //             <p>Cashier: ${transaction.cashierName}</p>
        //         </body>
        //     </html>
        // `);
        // receiptWindow.document.close();
console.log(transaction,"transac")
        setReceiptData(transaction);
        setReceiptLoaded(true);
        setShowReceiptModal(true);
    };


    const ReceiptModal= ({onClose})=>(
        <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000
            }}>
              <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '8px',
                width: '400px',
                maxWidth: '90%'
              }}>
                <h2 style={{ marginBottom: '20px' }}>Preview Receipt</h2>
                <div style={{
                  display: 'grid',
                  gap: '15px'
                }}>
                  
        
               {receiptLoaded?   <Receipt {...receiptData} /> :<></>}
                </div>
                <div style={{
                  marginTop: '20px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '10px'
                }}>
                  <button
                    onClick={onClose}
                    style={{
                      padding: '10px 20px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      backgroundColor: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                
                </div>
              </div>
            </div>
          );
    return (
        <div className="transaction-history">
            <style>
                {`
                    .transaction-history {
                        padding: 20px;
                      
                     
                    }

                    .filters {
                        display: flex;
                        gap: 20px;
                        margin-bottom: 20px;
                        padding: 15px;
                        background-color: #f5f5f5;
                        border-radius: 8px;
                    }

                    .filter-input {
                        padding: 8px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        font-size: 14px;
                    }

                    .transactions-table {
                        width: 100%;
                        border-collapse: collapse;
                        background-color: white;
                        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    }

                    .transactions-table th,
                    .transactions-table td {
                        padding: 12px;
                        text-align: left;
                        border-bottom: 1px solid #ddd;
                    }

                    .transactions-table th {
                        background-color: #f8f9fa;
                        font-weight: 600;
                    }

                    .transactions-table tr:hover {
                        background-color: #f5f5f5;
                    }

                    .view-receipt-btn {
                        padding: 6px 12px;
                        background-color: #007bff;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 14px;
                    }

                    .view-receipt-btn:hover {
                        background-color: #0056b3;
                    }

                    .no-results {
                        text-align: center;
                        padding: 20px;
                        color: #666;
                    }

                    .table-body-container {
  display: block;
  max-height: 400px; /* Adjust height as needed */
  overflow-y: auto;
}
                `}
            </style>

            <h1>Transaction History</h1>
            
            <div className="filters">
                <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="filter-input"
                />
                <input
                    type="text"
                    placeholder="Search by cashier..."
                    value={cashierFilter}
                    onChange={(e) => setCashierFilter(e.target.value)}
                    className="filter-input"
                />
                <input
                    type="text"
                    placeholder="Search by product..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="filter-input"
                />
            </div>
            <div className="table-body-container">
            <table className="transactions-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Transaction ID</th>
                        <th>Amount</th>
                        <th>Payment Method</th>
                        <th>Cashier</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.length > 0 ? (
                        filteredTransactions.map(transaction => (
                            <tr key={transaction._id}>
                                <td>{formatDate(transaction.date)}</td>
                                <td>{transaction._id}</td>
                                <td>₦{transaction.subtotal.toFixed(2)}</td>
                                <td>{transaction.paymentMethod}</td>
                                <td>{transaction.cashierName}</td>
                                <td>
                                    <button
                                        className="view-receipt-btn"
                                        onClick={() => generateReceipt(transaction)}
                                    >
                                        View Receipt
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="no-results">
                                No transactions found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>

            {showReceiptModal && <ReceiptModal onClose={() => setShowReceiptModal(false)} />}
        </div>
    );
};

export default TransactionHistory;