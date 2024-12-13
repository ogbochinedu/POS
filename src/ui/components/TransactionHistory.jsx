import React, { useState } from 'react';

const TransactionHistory = () => {
    // Sample transaction data - in a real app, this would come from your backend
    const [transactions] = useState([
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

    // Receipt generation
    const generateReceipt = (transaction) => {
        // Create receipt window
        const receiptWindow = window.open('', '_blank');
        receiptWindow.document.write(`
            <html>
                <head>
                    <title>Receipt #${transaction.id}</title>
                    <style>
                        body {
                            font-family: monospace;
                            padding: 20px;
                            max-width: 300px;
                            margin: 0 auto;
                        }
                        .header {
                            text-align: center;
                            margin-bottom: 20px;
                        }
                        .items {
                            border-top: 1px dashed #000;
                            border-bottom: 1px dashed #000;
                            padding: 10px 0;
                            margin: 10px 0;
                        }
                        .total {
                            text-align: right;
                            font-weight: bold;
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h2>Store Receipt</h2>
                        <p>Date: ${transaction.date}</p>
                        <p>Transaction #${transaction.id}</p>
                    </div>
                    <div class="items">
                        ${transaction.items.map(item => `
                            <p>${item.name} x${item.quantity} - $${item.price.toFixed(2)}</p>
                        `).join('')}
                    </div>
                    <div class="total">
                        <p>Total: ₦${transaction.amount.toFixed(2)}</p>
                        <p>Payment Method: ${transaction.paymentMethod}</p>
                    </div>
                    <p>Cashier: ${transaction.cashier}</p>
                </body>
            </html>
        `);
        receiptWindow.document.close();
    };

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
                            <tr key={transaction.id}>
                                <td>{transaction.date}</td>
                                <td>{transaction.id}</td>
                                <td>₦{transaction.amount.toFixed(2)}</td>
                                <td>{transaction.paymentMethod}</td>
                                <td>{transaction.cashier}</td>
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
    );
};

export default TransactionHistory;