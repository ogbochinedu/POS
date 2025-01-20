// import React, { useRef,useEffect } from 'react';
// const Receipt = ({ 
//   businessName,
//   address,
//   phoneNumber,
//   orderNumber,
//   cashierName,
//   items,
//   subtotal,
//   tax,
//   total,
//   paymentMethod,
//   dateTime,
//   customerName = '',
//   customMessage = 'Thank you for your patronage!',
//   change
// }) => {
//   const receiptRef = useRef(null);


//   useEffect(() => {
//     console.log('Window APIs:', Object.keys(window))
//     console.log('Electron API:', window.electronAPI)
//   }, [])


// if (window.electronAPI && window.electronAPI.onFromMain) {
//     window.electronAPI.onFromMain('reply-from-main', (data) => {
//       console.log('Data received:', data);
//     });
//   } else {
//     console.error('electronAPI or onFromMain is not defined');
//   }


  
//   const handlePrint = () => {
//     console.log('Attempting to print...')
//     if (window.electronAPI) {
//         const printContent = receiptRef.current.innerHTML;
//         const printData = `
//       <html>
//         <head>
//           <title>Receipt</title>
//           <style>
//             body {
//               font-family: monospace;
//               margin: 0;
//               padding: 0;
//               background-color: #fff;
//             }
            
//               .receipt {
//   width: 70mm; /* Match the printer width */
//   margin: 0 auto; /* Center the content */
//   padding: 5mm;
//   font-family: monospace;
//   font-size: 8px;
//   line-height: 1.5;
//   box-sizing: border-box; /* Include padding in width */
//   word-wrap: break-word; /* Ensure text wraps within the container */
// }

//             .center {
//               text-align: center;
//             }
//             .divider {
//               border-top: 1px dashed #000;
//               margin: 8px 0;
//             }
//             .right {
//               text-align: right;
//             }
//             .bold {
//               font-weight: bold;
//             }
          

//             .item {
//   display: flex;
//   justify-content: space-between;
//   overflow: hidden; /* Prevent overflow issues */
//    padding-right: 10px;
// }

//           </style>
//         </head>
//         <body>
//           ${printContent}
//         </body>
//       </html>
//     `
//   //console.log(printContent)
//         // Send the content to the main process to handle the print request
//         window.electronAPI.print('print-request', printData);
//     } else {
//       console.error('Electron API is not available')
//       console.log('window object:', window)
//     }
//   }
//   // .receipt {
//   //   width: 220px; /* Standard thermal printer width */
//   //   margin: auto;
//   //   padding: 10px;
//   //   font-size: 10px;
//   //   line-height: 1.4;
//   //   color: #000;
//   // }
//   // .item {
//   //   display: flex;
//   //   justify-content: space-between;
//   // }
//   const renderLineItem = (item) => {
//     const itemTotal = (item.price * item.quantity).toFixed(2);
//     return (
//       <div className="item">
//         <span>{item.quantity}x {item.name}</span>
//         <span>₦{itemTotal}</span>
//       </div>
//     );
//   };

//   return (
//     <div>
       
//       <div ref={receiptRef} className="receipt">
//         {/* Business Info */}
//         <div className="center bold">{businessName}</div>
//         <div className="center">{address}</div>
//         <div className="center">{phoneNumber}</div>
//         <div className="divider"></div>

//         {/* Order Info */}
//         Order No: # <div  className="bold">{orderNumber}</div>
//         {/* {customerName && <div>Customer: {customerName}</div>} */}
//         <div>Cashier: {cashierName}</div>
//         <div>Date: {dateTime}</div>
//         <div className="divider"></div>

//         {/* Items */}
//         <div>
//           {items.map((item, index) => (
//             <div key={index}>{renderLineItem(item)}</div>
//           ))}
//         </div>
//         <div className="divider"></div>

//         {/* Pricing Summary */}
//         <div className="item">
//           <span>Subtotal:</span>
//           <span>₦{subtotal.toFixed(2)}</span>
//         </div>
//         {/* <div className="item">
//           <span>Tax:</span>
//           <span>₦{tax.toFixed(2)}</span>
//         </div> */}
//         <div className="divider"></div>
//         <div className="item bold">
//           <span>Total:</span>
//           <span>₦{total.toFixed(2)}</span>
//         </div>
//         <div className="divider"></div>

//         {/* Payment Info */}
//         <div>Payment Method: {paymentMethod}</div>
//         {change>0?<div>Change: ₦{change}</div>:null}
//         <div className="divider"></div>
//         {/* Footer */}
//         <div className="center">{customMessage}</div>
//       </div>

     
//       <button 
//   onClick={handlePrint} 
//   style={{
//     padding: '10px 20px',
//     backgroundColor: '#28a745',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     display: 'block', // Add this
//     marginLeft: 'auto', // Add this
//     marginRight: 'auto' // Add this
//   }}
// >
//   Print Receipt
// </button>
//     </div>
//   );
// };

//  export default Receipt;



// import React, { useRef } from 'react';

// const Receipt = ({
//   businessName,
//   address,
//   phoneNumber,
//   orderNumber,
//   cashierName,
//   items,
//   subtotal,
//   total,
//   paymentMethod,
//   dateTime,
//   customMessage = 'Thank you for your patronage!',
//   change,
// }) => {
//   const receiptRef = useRef(null);

//   const handlePrint1 = () => {
//     const printContent = receiptRef.current.innerHTML;
//     const printWindow = window.open('', '_blank');
//     printWindow.document.open();
//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>Receipt</title>
//           <style>
//             body {
//               font-family: monospace;
//               margin: 0;
//               padding: 0;
//               background-color: #fff;
//             }
//             .receipt {
//               width: 58mm; /* Match standard receipt printer width */
//               margin: auto;
//               padding: 5mm;
//               font-size: 10px;
//               line-height: 1.4;
//               box-sizing: border-box;
//                word-wrap: break-word;
//             }
//             .center {
//               text-align: center;
//             }
//             .divider {
//               border-top: 1px dashed #000;
//               margin: 8px 0;
//             }
//             .item {
//               display: flex;
//               justify-content: space-between;
//               overflow: hidden;
//                word-break: break-word;
//             }
//             .bold {
//               font-weight: bold;
//             }
//             @media print {
//               body {
//                 -webkit-print-color-adjust: exact;
//                 margin: 0;
//               }
//             }
//           </style>
//         </head>
//         <body>
//           <div class="receipt">${printContent}</div>
//         </body>
//       </html>
//     `);
//     printWindow.document.close();
//     printWindow.focus();
//     printWindow.print();
//     printWindow.close();
//   };
//   const handlePrint = () => {
//     const printContent = receiptRef.current.innerHTML;
//     const printWindow = window.open('', '_blank');
//     printWindow.document.open();
//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>Receipt</title>
//           <style>
//             @page {
//               margin: 0; /* Remove default margins */
//             }
//             body {
//               font-family: monospace;
//               margin: 0;
//               padding: 0;
//               background-color: #fff;
//             }
//             .receipt {
//               width: 58mm; /* Match standard receipt printer width */
//               margin: 0; /* Remove extra space */
//               padding: 0; /* Remove unnecessary padding */
//               font-size: 10px;
//               line-height: 1.4;
//               box-sizing: border-box;
//               word-wrap: break-word;
//             }
//             .center {
//               text-align: center;
//             }
//             .divider {
//               border-top: 1px dashed #000;
//               margin: 8px 0;
//             }
//             .item {
//               display: flex;
//               justify-content: space-between;
//               overflow: hidden;
//               word-break: break-word;
//             }
//             .bold {
//               font-weight: bold;
//             }
//             @media print {
//               body {
//                 -webkit-print-color-adjust: exact;
//                 margin: 0;
//               }
//             }
//           </style>
//         </head>
//         <body>
//           <div class="receipt">${printContent}</div>
//         </body>
//       </html>
//     `);
//     printWindow.document.close();
//     printWindow.focus();
//     printWindow.print();
//     printWindow.close();
//   };
  

//   const renderLineItem = (item) => {
//     const itemTotal = (item.price * item.quantity).toFixed(2);
//     return (
//       <div className="item">
//         <span>{item.quantity}x {item.name}</span>
//         <span>₦{itemTotal}</span>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <div ref={receiptRef} className="receipt">
//         {/* Business Info */}
//         <div className="center bold">{businessName}</div>
//         <div className="center">{address}</div>
//         <div className="center">{phoneNumber}</div>
//         <div className="divider"></div>

//         {/* Order Info */}
//         <div>Order No: #<span className="bold">{orderNumber}</span></div>
//         <div>Cashier: {cashierName}</div>
//         <div>Date: {dateTime}</div>
//         <div className="divider"></div>

//         {/* Items */}
//         {items.map((item, index) => (
//           <div key={index}>{renderLineItem(item)}</div>
//         ))}
//         <div className="divider"></div>

//         {/* Pricing Summary */}
//         <div className="item">
//           <span>Subtotal:</span>
//           <span>₦{subtotal.toFixed(2)}</span>
//         </div>
//         <div className="divider"></div>
//         <div className="item bold">
//           <span>Total:</span>
//           <span>₦{total.toFixed(2)}</span>
//         </div>
//         <div className="divider"></div>

//         {/* Payment Info */}
//         <div>Payment Method: {paymentMethod}</div>
//         {change > 0 && <div>Change: ₦{change.toFixed(2)}</div>}
//         <div className="divider"></div>

//         {/* Footer */}
//         <div className="center">{customMessage}</div>
//       </div>

//       <button
//         onClick={handlePrint}
//         style={{
//           padding: '10px 20px',
//           backgroundColor: '#28a745',
//           color: 'white',
//           border: 'none',
//           borderRadius: '4px',
//           cursor: 'pointer',
//           display: 'block',
//           margin: '10px auto',
//         }}
//       >
//         Print Receipt
//       </button>
//     </div>
//   );
// };

// export default Receipt;

import React, { useRef } from 'react';

const Receipt = ({
  businessName,
  address,
  phoneNumber,
  orderNumber,
  cashierName,
  items,
  subtotal,
  total,
  paymentMethod,
  dateTime,
  customMessage = 'Thank you for your patronage!',
  change,
}) => {
  const receiptRef = useRef(null);

  const handlePrint = () => {
    const printContent = receiptRef.current.innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #fff;
            }
            .receipt {
              width: 58mm; /* Standard thermal receipt width */
              margin: 0 auto;
              padding: 5mm;
              font-size: 12px; /* Increased for better visibility */
              line-height: 1.6;
              color: #000;
              box-sizing: border-box;
              word-wrap: break-word;
            }
            .center {
              text-align: center;
            }
            .divider {
              border-top: 1px solid #000;
              margin: 10px 0;
            }
            .item {
              display: flex;
              justify-content: space-between;
              word-break: break-word;
            }
            .bold {
              font-weight: bold;
            }
            .highlight {
              font-size: 14px; /* Highlight key text with larger size */
            }
            @media print {
              body {
                margin: 0;
                -webkit-print-color-adjust: exact;
              }
              .receipt {
                width: 100%;
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="receipt">${printContent}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

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
        <div className="center bold highlight">{businessName}</div>
        <div className="center">{address}</div>
        <div className="center">{phoneNumber}</div>
        <div className="divider"></div>

        {/* Order Info */}
        <div>Order No: #<span className="bold">{orderNumber}</span></div>
        <div>Cashier: {cashierName}</div>
        <div>Date: {dateTime}</div>
        <div className="divider"></div>

        {/* Items */}
        {items.map((item, index) => (
          <div key={index}>{renderLineItem(item)}</div>
        ))}
        <div className="divider"></div>

        {/* Pricing Summary */}
        <div className="item">
          <span>Subtotal:</span>
          <span>₦{subtotal.toFixed(2)}</span>
        </div>
        <div className="divider"></div>
        <div className="item bold highlight">
          <span>Total:</span>
          <span>₦{total.toFixed(2)}</span>
        </div>
        <div className="divider"></div>

        {/* Payment Info */}
        <div>Payment Method: {paymentMethod}</div>
        {change > 0 && <div>Change: ₦{change.toFixed(2)}</div>}
        <div className="divider"></div>

        {/* Footer */}
        <div className="center">{customMessage}</div>
      </div>

      <button
        onClick={handlePrint}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'block',
          margin: '10px auto',
        }}
      >
        Print Receipt
      </button>
    </div>
  );
};

export default Receipt;
