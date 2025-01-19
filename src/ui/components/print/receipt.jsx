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
              width: 220px; /* Standard thermal printer width */
              margin: auto;
              padding: 10px;
              font-size: 10px;
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

// import React, { useRef, useEffect } from 'react';

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
//     // Set up event listener when component mounts
//     if (window.electronAPI?.onFromMain) {
//       window.electronAPI.onFromMain('reply-from-main', handlePrintResponse);
//     }

//     // Cleanup listener when component unmounts
//     return () => {
//       if (window.electronAPI?.onFromMain) {
//         window.electronAPI.onFromMain('reply-from-main', null);
//       }
//     };
//   }, []);

//   const handlePrintResponse = (data) => {
//     console.log('Print response:', data);
//   };

//   const handlePrint = () => {
//     console.log('Initiating print...');
//     if (window.electronAPI?.print) {
//       const printContent = receiptRef.current.innerHTML;
//       const printData = `
//         <!DOCTYPE html>
//         <html>
//           <head>
//             <meta charset="utf-8">
//             <title>Receipt</title>
//             <style>
//               @page {
//                 margin: 0;
//                 size: 80mm auto; /* Standard thermal paper width */
//               }
              
//               body {
//                 font-family: 'Courier New', monospace;
//                 margin: 0;
//                 padding: 0;
//                 background-color: white;
//                 color: black;
//                 width: 80mm;
//               }
              
//               .receipt {
//                 width: 72mm; /* Account for margins */
//                 padding: 3mm;
//                 font-size: 12pt;
//                 line-height: 1.2;
//               }
              
//               /* Header Styles */
//               .business-header {
//                 text-align: center;
//                 margin-bottom: 3mm;
//               }
              
//               .business-name {
//                 font-size: 14pt;
//                 font-weight: bold;
//                 margin-bottom: 1mm;
//               }
              
//               /* Divider Line */
//               .divider {
//                 border-top: 1px dashed black;
//                 margin: 2mm 0;
//                 clear: both;
//               }
              
//               /* Item Layout */
//               .item {
//                 display: flex;
//                 justify-content: space-between;
//                 margin: 1mm 0;
//               }
              
//               .item-left {
//                 flex: 1;
//                 text-align: left;
//                 padding-right: 2mm;
//               }
              
//               .item-right {
//                 width: 20mm;
//                 text-align: right;
//               }
              
//               /* Totals Section */
//               .bold {
//                 font-weight: bold;
//               }
              
//               .total-section {
//                 margin: 2mm 0;
//               }
              
//               /* Footer */
//               .footer {
//                 text-align: center;
//                 margin-top: 3mm;
//                 font-size: 10pt;
//               }
              
//               /* Cut Line */
//               .cut-line {
//                 border-bottom: 1px dashed black;
//                 margin: 5mm 0;
//                 position: relative;
//               }
              
//               .cut-line::before {
//                 content: "✂ ---------------";
//                 position: absolute;
//                 left: 0;
//                 right: 0;
//                 text-align: center;
//                 color: black;
//                 font-size: 8pt;
//               }

//               /* Ensure proper text wrapping */
//               * {
//                 white-space: pre-line;
//                 word-wrap: break-word;
//               }
//             </style>
//           </head>
//           <body>
//             ${printContent}
//           </body>
//         </html>
//       `;

//       try {
//         window.electronAPI.print('print-request', printData);
//       } catch (error) {
//         console.error('Print error:', error);
//       }
//     } else {
//       console.error('Electron API is not available');
//     }
//   };

//   const renderLineItem = (item) => {
//     const itemTotal = (item.price * item.quantity).toFixed(2);
//     return (
//       <div className="item">
//         <div className="item-left">
//           <span className="bold">{item.quantity}x </span>
//           {item.name}
//         </div>
//         <div className="item-right">₦{itemTotal}</div>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <div ref={receiptRef} className="receipt">
//         <div className="business-header">
//           <div className="business-name">{businessName}</div>
//           <div>{address}</div>
//           <div>{phoneNumber}</div>
//         </div>
        
//         <div className="divider" />
        
//         <div>
//           <div>Order No: #{orderNumber}</div>
//           <div>Cashier: {cashierName}</div>
//           <div>Date: {dateTime}</div>
//           {customerName && <div>Customer: {customerName}</div>}
//         </div>
        
//         <div className="divider" />
        
//         <div className="items-section">
//           {items.map((item, index) => (
//             <div key={index}>{renderLineItem(item)}</div>
//           ))}
//         </div>
        
//         <div className="divider" />
        
//         <div className="total-section">
//           <div className="item">
//             <span>Subtotal:</span>
//             <span className="item-right">₦{subtotal.toFixed(2)}</span>
//           </div>
          
//           <div className="divider" />
          
//           <div className="item bold">
//             <span>Total:</span>
//             <span className="item-right">₦{total.toFixed(2)}</span>
//           </div>
//         </div>
        
//         <div className="divider" />
        
//         <div>
//           <div>Payment Method: {paymentMethod}</div>
//           {change > 0 && <div>Change: ₦{change.toFixed(2)}</div>}
//         </div>
        
//         <div className="divider" />
        
//         <div className="footer">
//           {customMessage}
//           <div className="cut-line" />
//         </div>
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
//           margin: '20px auto'
//         }}
//       >
//         Print Receipt
//       </button>
//     </div>
//   );
// };

// export default Receipt;

// import React, { useRef, useEffect } from 'react';

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
//     if (window.electronAPI?.onFromMain) {
//       window.electronAPI.onFromMain('reply-from-main', (data) => {
//         console.log('Print status:', data);
//       });
//     }
//   }, []);

//   const handlePrint = () => {
//     if (window.electronAPI?.print) {
//       const printContent = receiptRef.current.innerHTML;
//       const printData = `
//         <div style="width: 100%; max-width: 80mm;">
//           ${printContent}
//         </div>
//       `;
      
//       window.electronAPI.print('print-request', printData);
//     } else {
//       console.error('Electron API is not available');
//     }
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
//       <div ref={receiptRef} style={{
//         fontFamily: 'Courier New, monospace',
//         fontSize: '12px',
//         lineHeight: '1.2',
//         width: '100%',
//         maxWidth: '80mm',
//         padding: '5mm',
//         margin: '0 auto',
//         backgroundColor: 'white',
//         color: 'black'
//       }}>
//         {/* Business Info */}
//         <div style={{ textAlign: 'center', marginBottom: '3mm' }}>
//           <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{businessName}</div>
//           <div>{address}</div>
//           <div>{phoneNumber}</div>
//         </div>

//         <div style={{ borderTop: '1px dashed black', margin: '2mm 0' }} />

//         {/* Order Info */}
//         <div style={{ marginBottom: '2mm' }}>
//           <div>Order No: #{orderNumber}</div>
//           <div>Cashier: {cashierName}</div>
//           <div>Date: {dateTime}</div>
//         </div>

//         <div style={{ borderTop: '1px dashed black', margin: '2mm 0' }} />

//         {/* Items */}
//         <div style={{ marginBottom: '2mm' }}>
//           {items.map((item, index) => (
//             <div key={index} style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               marginBottom: '1mm'
//             }}>
//               <span>{item.quantity}x {item.name}</span>
//               <span>₦{(item.price * item.quantity).toFixed(2)}</span>
//             </div>
//           ))}
//         </div>

//         <div style={{ borderTop: '1px dashed black', margin: '2mm 0' }} />

//         {/* Totals */}
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           marginBottom: '1mm'
//         }}>
//           <span>Subtotal:</span>
//           <span>₦{subtotal.toFixed(2)}</span>
//         </div>

//         <div style={{ borderTop: '1px dashed black', margin: '2mm 0' }} />

//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           fontWeight: 'bold',
//           marginBottom: '2mm'
//         }}>
//           <span>Total:</span>
//           <span>₦{total.toFixed(2)}</span>
//         </div>

//         {/* Payment Info */}
//         <div style={{ marginBottom: '2mm' }}>
//           <div>Payment Method: {paymentMethod}</div>
//           {change > 0 && <div>Change: ₦{change}</div>}
//         </div>

//         <div style={{ borderTop: '1px dashed black', margin: '2mm 0' }} />

//         {/* Footer */}
//         <div style={{ textAlign: 'center', marginTop: '3mm' }}>
//           {customMessage}
//         </div>

//         {/* Cut line indicator */}
//         <div style={{
//           borderTop: '1px dashed black',
//           margin: '5mm 0',
//           position: 'relative',
//           textAlign: 'center',
//           fontSize: '10px'
//         }}>
//           ✂ ---------------
//         </div>
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
//           margin: '20px auto'
//         }}
//       >
//         Print Receipt
//       </button>
//     </div>
//   );
// };

// export default Receipt;