import React, { useRef,useEffect } from 'react';
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


if (window.electronAPI && window.electronAPI.onFromMain) {
    window.electronAPI.onFromMain('reply-from-main', (data) => {
      console.log('Data received:', data);
    });
  } else {
    console.error('electronAPI or onFromMain is not defined');
  }


  
  const handlePrint = () => {
    console.log('Attempting to print...')
    if (window.electronAPI) {
        const printContent = receiptRef.current.innerHTML;
        const printData = `
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
  width: 80mm; /* Match the printer width */
  margin: 0 auto; /* Center the content */
  padding: 5mm;
  font-family: monospace;
  font-size: 10px;
  line-height: 1.5;
  box-sizing: border-box; /* Include padding in width */
  word-wrap: break-word; /* Ensure text wraps within the container */
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
  overflow: hidden; /* Prevent overflow issues */
}

          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `
  //console.log(printContent)
        // Send the content to the main process to handle the print request
        window.electronAPI.print('print-request', printData);
    } else {
      console.error('Electron API is not available')
      console.log('window object:', window)
    }
  }
  // .receipt {
  //   width: 220px; /* Standard thermal printer width */
  //   margin: auto;
  //   padding: 10px;
  //   font-size: 10px;
  //   line-height: 1.4;
  //   color: #000;
  // }
  // .item {
  //   display: flex;
  //   justify-content: space-between;
  // }
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
        <div  className="bold">Order No: #{orderNumber}</div>
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
        {change>0?<div>Change: ₦{change}</div>:null}
        <div className="divider"></div>
        {/* Footer */}
        <div className="center">{customMessage}</div>
      </div>

     
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

