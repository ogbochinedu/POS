import React from 'react';
import Receipt from './print/receipt';

const ReceiptExample = ({data,paymentMethod}) => {
  const sampleData = {
    businessName: "Mimi 042",
    address: "123 Main Street, City, State 12345",
    phoneNumber: "(555) 123-4567",
    orderNumber: "1001",
    cashierName: "John Doe",
    items: [
      {
        name: "Organic Bananas",
        quantity: 2,
        price: 3.99,
        notes: "Ripe"
      },
      {
        name: "Whole Grain Bread",
        quantity: 1,
        price: 4.50
      },
      {
        name: "Fresh Milk 1L",
        quantity: 3,
        price: 2.99
      }
    ],
    subtotal: 18.45,
    tax: 1.48,
    total: 19.93,
    paymentMethod: "Credit Card",
    dateTime: new Date().toLocaleString(),
    customerName: "Jane Smith",
    customMessage: "Thank you for shopping with us!"
  };

  return (
    <div className="p-4 bg-gray-100">
      <div className="bg-white p-4 rounded shadow-lg max-w-sm mx-auto">
        <Receipt {...sampleData} />
      </div>
    </div>
  );
};

export default ReceiptExample;