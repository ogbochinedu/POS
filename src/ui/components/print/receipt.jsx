import React, { useRef,useEffect } from 'react';
//import { ipcRenderer }  from 'electron';

const Receipt = ({ 
  businessName,
  address,
  phoneNumber,
  orderNumber,
  cashierName,
  items,
  subtotal,
  tax,
  total,
  paymentMethod,
  dateTime,
  customerName = '',
  customMessage = 'Thank you for your patronage!',
  change
}) => {
  const receiptRef = useRef(null);


  useEffect(() => {
    console.log('Window APIs:', Object.keys(window))
    console.log('Electron API:', window.electronAPI)
  }, [])

  // Print the receipt
  const handlePrint1 = () => {
    const printContent = receiptRef.current;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body {
              font-family: monospace;
              margin: 0;
              padding: 0;
              background-color: #fff;
            }
            .receipt {
              width: 280px; /* Standard thermal printer width */
              margin: auto;
              padding: 10px;
              font-size: 12px;
              line-height: 1.4;
              color: #000;
            }
            .center {
              text-align: center;
            }
            .divider {
              border-top: 1px dashed #000;
              margin: 8px 0;
            }
            .right {
              text-align: right;
            }
            .bold {
              font-weight: bold;
            }
            .item {
              display: flex;
              justify-content: space-between;
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };
//   const handlePrint = () => {
//     const printContent = receiptRef.current.innerHTML;
  
//     // Send the content to the main process to handle the print request
//    // ipcRenderer.send('print-receipt', printContent);
//     // Sending data to the main process
// document.getElementById('printButton').addEventListener('click', () => {
//     const receiptContent = '<div>Receipt Content</div>';
//     window.electronAPI.sendToMain('print-receipt', receiptContent);
//   });
  
//   // Receiving data from the main process
//   window.electronAPI.onFromMain('reply-from-main', (response) => {
//     console.log('Received reply:', response);
//   });
  
//   };
const handlePrint33 = () => {
    const printContent = receiptRef.current.innerHTML;
  
    // Send the content to the main process to handle the print request
    window.electronAPI.sendToMain('print-request', printContent);
  };
  
  // Listening for responses from the main process
//   window.electronAPI.onFromMain('reply-from-main', (response) => {
//     console.log('Received reply:', response);
//   });
if (window.electronAPI && window.electronAPI.onFromMain) {
    window.electronAPI.onFromMain('reply-from-main', (data) => {
      console.log('Data received:', data);
    });
  } else {
    console.error('electronAPI or onFromMain is not defined');
  }


const handlePrint44 = () => {
    console.log(window,"window..")
    if (window.electronAPI) {
      window.electronAPI.sendToMain('print-request', /* your data here */)
    } else {
      console.error('Electron API is not available')
    }
  }
  
  const handlePrint = () => {
    console.log('Attempting to print...')
    if (window.electronAPI) {
        const printContent = receiptRef.current.innerHTML;
  //console.log(printContent)
        // Send the content to the main process to handle the print request
        window.electronAPI.print('print-request', printContent);
    } else {
      console.error('Electron API is not available')
      console.log('window object:', window)
    }
  }

  const renderLineItem = (item) => {
    const itemTotal = (item.price * item.quantity).toFixed(2);
    return (
      <div className="item">
        <span>{item.quantity}x {item.name}</span>
        <span>₦{itemTotal}</span>
      </div>
    );
  };

  return (
    <div>
       
      <div ref={receiptRef} className="receipt">
        {/* Business Info */}
        <div className="center bold">{businessName}</div>
        <div className="center">{address}</div>
        <div className="center">{phoneNumber}</div>
        <div className="divider"></div>

        {/* Order Info */}
        <div>Order No: #{orderNumber}</div>
        {/* {customerName && <div>Customer: {customerName}</div>} */}
        <div>Cashier: {cashierName}</div>
        <div>Date: {dateTime}</div>
        <div className="divider"></div>

        {/* Items */}
        <div>
          {items.map((item, index) => (
            <div key={index}>{renderLineItem(item)}</div>
          ))}
        </div>
        <div className="divider"></div>

        {/* Pricing Summary */}
        <div className="item">
          <span>Subtotal:</span>
          <span>₦{subtotal.toFixed(2)}</span>
        </div>
        {/* <div className="item">
          <span>Tax:</span>
          <span>₦{tax.toFixed(2)}</span>
        </div> */}
        <div className="divider"></div>
        <div className="item bold">
          <span>Total:</span>
          <span>₦{total.toFixed(2)}</span>
        </div>
        <div className="divider"></div>

        {/* Payment Info */}
        <div>Payment Method: {paymentMethod}</div>
        {change?<div>Change: ₦{change}</div>:null}
        <div className="divider"></div>
        {/* Footer */}
        <div className="center">{customMessage}</div>
      </div>

      {/* Print Button */}
      {/* <button 
        onClick={handlePrint} 
        style={{
            padding: '10px 20px',
            backgroundColor:   '#28a745' ,
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            alignItems:'center' 
          }}
      >
        Print Receipt
      </button> */}
      <button 
  onClick={handlePrint} 
  style={{
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'block', // Add this
    marginLeft: 'auto', // Add this
    marginRight: 'auto' // Add this
  }}
>
  Print Receipt
</button>
    </div>
  );
};

export default Receipt;
