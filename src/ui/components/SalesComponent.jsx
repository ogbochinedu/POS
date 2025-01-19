import React, { useState, useEffect,useCallback } from 'react';
import ReceiptExample from '../components/Receipt';
import Receipt from './print/receipt';
import useProducts from '../../hooks/useProducts';
import useTransactions from '../../hooks/useTransactions';

const POSCheckoutPage = () => {
  const{ productsValue,loading,error,addProduct,updateProduct, deleteProduct}=useProducts();
  const {addTransaction} =useTransactions();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const [receiptData,setReceiptData] =useState();
  const [receiptLoaded,setReceiptLoaded] = useState(false);

  const [amountPaid, setAmountPaid] = useState('');
  const [change, setChange] = useState(null);
  const [showChange, setShowChange] = useState(false);

console.log(cart,"cart..")
  useEffect(() => {
    fetchAndMapProducts();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [cart, discount]);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, products]);

  const handleSearch = (query) => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

//   const fetchAndMapProducts = async () => {
//     try {
// var productsFromDb = productsValue;
// console.log(productsFromDb,"products from db..")
// if (!productsFromDb || productsFromDb.length === 0) {

//       const response = await fetch("https://main.d3myqrx0bf94mb.amplifyapp.com/api/products/byBusinessAndBranch?businessid=67404e0b311a977dfc311c8f&branch=Select%20Branch&page=1&limit=1000");
//       const apiProducts = await response.json();

//       const remappedProducts = apiProducts?.data?.map(product => ({
//         id: product._id,
//         name: product.Name || "Unnamed Product",
//         image: product.mainpictureurl || "/api/placeholder/100/100",
//         price: parseFloat(product.Price) || 0,
//         category: product.Category || "Uncategorized",
//         quantity: product.quantity || 0,
//         inventoryStatus: product.isAvailable ? "INSTOCK" : "OUTOFSTOCK",
//       }));

//       setProducts(remappedProducts);
//       remappedProducts?.map((index) => {
//         addProduct(index);
//       });

//       setFilteredProducts(remappedProducts);
//     }
//     else{    
//         setFilteredProducts(productsFromDb); 
//     }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };


function generateTransactionNumber() {
  const prefix = "MIMIsPlace042"; // Unique prefix for Mimi's Place
  const timestamp = Date.now(); // Current timestamp in milliseconds
  const randomPart = Math.floor(Math.random() * 100000); // Random number for uniqueness
  return `${prefix}-${timestamp}-${randomPart}`;
}

const fetchAndMapProducts = async () => {
  try {
    // Fetch products from localStorage
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    console.log(storedProducts, "products from localStorage..");

    if (!storedProducts || storedProducts.length === 0) {
      // Fetch from API if no products are in localStorage
      const response = await fetch(
        "https://main.d3myqrx0bf94mb.amplifyapp.com/api/products/byBusinessAndBranch?businessid=67404e0b311a977dfc311c8f&branch=Select%20Branch&page=1&limit=1000"
      );
      const apiProducts = await response.json();

      const remappedProducts = apiProducts?.data?.map(product => ({
        id: product._id,
        name: product.Name || "Unnamed Product",
        image: product.mainpictureurl || "/api/placeholder/100/100",
        price: parseFloat(product.Price) || 0,
        category: product.Category || "Uncategorized",
        quantity: product.quantity || 0,
        inventoryStatus: product.isAvailable ? "INSTOCK" : "OUTOFSTOCK",
      }));

      // Save remapped products to localStorage
      localStorage.setItem("products", JSON.stringify(remappedProducts));

      // Update state
      setProducts(remappedProducts);
      remappedProducts?.forEach(product => {
        addProduct(product); // Assuming addProduct handles state logic
      });

      setFilteredProducts(remappedProducts);
    } else {
      // Use stored products
      setProducts(storedProducts);
      setFilteredProducts(storedProducts);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};


const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = (subtotal * discount) / 100;
    setTotal(subtotal - discountAmount);
  };

  const applyDiscount = (percentage) => {
    setDiscount(percentage);
  };



  const handlePrintReceipt = () => {
    console.log('Printing receipt:', { cart, total, discount });
  };

  // Payment Modal Component
  const PaymentModal = ({ onClose }) => (
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
        <h2 style={{ marginBottom: '20px' }}>Select Payment Method</h2>
        <div style={{
          display: 'grid',
          gap: '15px'
        }}>
          <button
            onClick={() => handlePayment('cash')}
            style={{
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: paymentMethod === 'cash' ? '#e3f2fd' : 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px'
            }}
          >
            Cash Payment
          </button>
          <button
            onClick={() => handlePayment('card')}
            style={{
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: paymentMethod === 'card' ? '#e3f2fd' : 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px'
            }}
          >
            Card Payment
          </button>
          <button
            onClick={() => handlePayment('transfer')}
            style={{
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: paymentMethod === 'transfer' ? '#e3f2fd' : 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px'
            }}
          >
            Bank Transfer
          </button>
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
          <button
            onClick={handleCheckout}
            disabled={!paymentMethod}
            style={{
              padding: '10px 20px',
              backgroundColor: paymentMethod ? '#28a745' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: paymentMethod ? 'pointer' : 'not-allowed'
            }}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );

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
          <button
            onClick={saveTransaction}
            disabled={!paymentMethod}
            style={{
              padding: '10px 20px',
              backgroundColor: paymentMethod ? '#28a745' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: paymentMethod ? 'pointer' : 'not-allowed'
            }}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );

  const handleAmountChange1 = (e) => {
    const value = e.target.value;
    setAmountPaid(value);

    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue >= total) {
        const changeValue = numericValue - total;
      setChange(changeValue);
    } else {
      setChange(null);
    }

  };
    // Debounced input handler
    const handleAmountChange = useCallback((e) => {
      const value = e.target.value;
      setAmountPaid(value);
  
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue) && numericValue >= total) {
        setChange(numericValue - total);
      } else {
        setChange(null);
      }
    }, [total]);


  const ChangeModal= ({onClose})=>(
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
              
              <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          width: '400px',
          maxWidth: '90%',
        }}
      >
        <h2 style={{ marginBottom: '20px' }}>Cash</h2>
        <div
          style={{
            display: 'grid',
            gap: '15px',
          }}
        >
          <p>Total Amount: <strong>₦{total.toFixed(2)}</strong></p>
          <label>
            Amount Paid:
            <input
              type="number"
              value={amountPaid}
              onChange={handleAmountChange}
              placeholder="Enter amount paid"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                marginTop: '8px',
              }}
            />
          </label>
          {/* {change !== null && (
            <p>
              Change: <strong>₦{change.toFixed(2)}</strong>
            </p>
          )} */}
        </div>
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: 'white',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleCheckout}
            disabled={!amountPaid || change === null}
            style={{
              padding: '10px 20px',
              backgroundColor: amountPaid && change !== null ? '#28a745' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: amountPaid && change !== null ? 'pointer' : 'not-allowed',
            }}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
          
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
              <button
                onClick={handleCheckout}
                disabled={!paymentMethod}
                style={{
                  padding: '10px 20px',
                  backgroundColor: paymentMethod ? '#28a745' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: paymentMethod ? 'pointer' : 'not-allowed'
                }}
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      );

  const handlePayment = (method) => {
    setPaymentMethod(method);
    let total  = 0;
    const output = cart?.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        notes: item.inventoryStatus === "INSTOCK" ? "Available" : "Out of Stock"

      }    ));
      // Calculate total price
total = cart.reduce(
    (acc, item) => acc + Number(item.quantity) * Number(item.price), // Convert to numbers here as well
    0
  ); 

  const loggedinuser  = JSON.parse(localStorage.getItem("user")) || null;
      
    const sampleData = {
        businessName: "Mimi 042",
        address: "Coal City Garden Estate Shopping Mall, Okpara Ave, behind CBN Office, Enugu",
        phoneNumber: "(+234) 807-733-8874",
        orderNumber: generateTransactionNumber(),
        cashierName: loggedinuser?.name || "Mimi's Cashier",
        items: output,
        subtotal: total,
        tax: 1.48,
        total: total,
        paymentMethod: method,
        dateTime: new Date().toLocaleString(),
        customerName: "Jane Smith",
        customMessage: "Thank you for dining with us! We hope you enjoyed your meal and look forward to serving you again.",
        change: method ==='cash'? amountPaid - total : 0
      };
      if(method==='cash')
        {setShowChange(true)
        setShowReceiptModal(false);
        setShowPaymentModal(false);
        }
      else{
    setShowReceiptModal(true);
      }
    setReceiptData(sampleData);
    setReceiptLoaded(true);
  };

  const handleCheckout = () => {
    console.log('Processing checkout:', { cart, total, discount, paymentMethod });
    setShowPaymentModal(false);
    setShowReceiptModal(true);
    setShowChange(false);
    // Implement payment processing logic here
  };


  const saveTransaction =async()=>{
    addTransaction(receiptData);
    await postTransaction("67404e0b311a977dfc311c8f",receiptData)
    setCart([]);
    setShowReceiptModal(false);
    setShowPaymentModal(false);
  }

  async function postTransaction(businessId, transactionData) {
    const url = "http://localhost:3001/api/PosTransaction"; // Replace with your actual API endpoint
    const payload = {
      businessId,
      transactionData,
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error posting transaction:", errorData.error);
        return { success: false, error: errorData.error };
      }
  
      const result = await response.json();
      console.log("Transaction saved successfully:", result);
      await retryUnsentTransactions();
      return { success: true, data: result.data };
    } catch (error) {
      console.error("Error occurred while posting transaction:", error.message);

    const unsentTransactions = JSON.parse(localStorage.getItem("unsentTransactions")) || [];
    unsentTransactions.push(payload);
    localStorage.setItem("unsentTransactions", JSON.stringify(unsentTransactions));
    console.log("Transaction saved to local storage for retry later.");
    return { success: false, error: error.message };
    }
  }


  // Function to retry sending unsent transactions
async function retryUnsentTransactions() {
  const url = "http://localhost:3001/api/PosTransaction"; // Replace with your actual API endpoint
  const unsentTransactions = JSON.parse(localStorage.getItem("unsentTransactions")) || [];

  if (unsentTransactions.length === 0) {
    console.log("No unsent transactions to retry.");
    return;
  }

  console.log(`Retrying ${unsentTransactions.length} unsent transactions...`);

  const successfullySent = [];

  for (const transaction of unsentTransactions) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Transaction retried successfully:", result);
        successfullySent.push(transaction);
      } else {
        const errorData = await response.json();
        console.error("Error retrying transaction:", errorData.error);
      }
    } catch (error) {
      console.error("Error occurred while retrying transaction:", error.message);
    }
  }

  // Remove successfully sent transactions from local storage
  const remainingTransactions = unsentTransactions.filter(
    (transaction) => !successfullySent.includes(transaction)
  );
  localStorage.setItem("unsentTransactions", JSON.stringify(remainingTransactions));

  console.log(`${successfullySent.length} transactions retried successfully.`);
}

  // ... (previous functions remain the same)

  return (
    <div style={{
      display: 'flex',
       height: '88vh',
      gap: '20px',
      padding: '20px',
      backgroundColor: '#e6f4ff'
    }}>
      {/* Products Section */}
      <div style={{
        width: '65%',
        overflowY: 'auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ padding: '20px', }}>
         
          <div
  style={{
    position: 'relative',
    marginBottom: '20px',
    marginRight: '20px',
    maxWidth: '100%', // Ensure the container doesn't exceed its parent
    overflow: 'hidden', // Prevent overflow
    boxSizing: 'border-box', // Include padding in width calculation
  }}
>
  <input
    type="text"
    placeholder="Search products by name or category..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    style={{
      width: '100%', // Make the input responsive
      padding: '12px 40px 12px 15px',
      border: '2px solid #ddd',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'border-color 0.3s ease',
      outline: 'none',
      boxSizing: 'border-box', // Include padding in width calculation
    }}
  />
  <span
    style={{
      position: 'absolute',
      right: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#666',
      pointerEvents: 'none', // Prevent interaction with the icon
      whiteSpace: 'nowrap', // Prevent icon from wrapping
    }}
  >
    🔍
  </span>
</div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '20px'
          }}>
            {filteredProducts.map((product) => (
              <div key={product.id} style={{
                border: '1px solid #e1e1e1',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: 'white',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                }
              }}>
                <div style={{
                  position: 'relative',
                  paddingTop: '75%',
                  overflow: 'hidden'
                }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div style={{ padding: '15px' }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#666',
                    marginBottom: '5px'
                  }}>
                    {product.category}
                  </div>
                  <h3 style={{
                    margin: '0 0 10px 0',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#333'
                  }}>{product.name}</h3>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#2c3e50'
                    }}>₦{product.price}</span>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.inventoryStatus === 'OUTOFSTOCK'}
                      style={{
                        padding: '8px 15px',
                        backgroundColor: product.inventoryStatus === 'OUTOFSTOCK' ? '#ccc' : '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: product.inventoryStatus === 'OUTOFSTOCK' ? 'not-allowed' : 'pointer',
                        transition: 'background-color 0.3s ease',
                        ':hover': {
                          backgroundColor: product.inventoryStatus === 'OUTOFSTOCK' ? '#ccc' : '#2980b9'
                        }
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

         {/* Cart Section */}
         <div style={{
        width: '35%',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #ddd'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: 'bold'
          }}>Shopping Cart</h2>
        </div>

        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px'
        }}>
          {cart.map((item) => (
            <div key={item.id} style={{
              display: 'flex',
              gap: '15px',
              padding: '15px',
              borderBottom: '1px solid #eee'
            }}>
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: '4px'
                }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
                <p style={{ margin: '0 0 10px 0' }}>₦{item.price}</p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{
                      padding: '5px 10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      backgroundColor: 'white'
                    }}
                  ><span style={{color:"black"}}>-</span></button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{
                      padding: '5px 10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      backgroundColor: 'white'
                    }}
                  ><span style={{color:"black"}}>+</span> </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      marginLeft: 'auto'
                    }}
                  >Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          padding: '20px',
          borderTop: '1px solid #ddd'
        }}>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
            fontWeight: 'bold'
          }}>
            <span>Total:</span>
            <span>₦{total.toFixed(2)}</span>
          </div>
          <div style={{
            display: 'flex',
            gap: '10px'
          }}>
            
            <button
            onClick={() => setShowPaymentModal(true)}
            disabled={cart.length === 0}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: cart.length === 0 ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Proceed to Payment
          </button>
          </div>
        </div>
      </div>

      {showPaymentModal && <PaymentModal onClose={() => setShowPaymentModal(false)} />}
      {showReceiptModal && <ReceiptModal onClose={() => setShowReceiptModal(false)} />}
      {showChange && <ChangeModal onClose={() => setShowChange(false)} />}
      
    </div>
  );
};

export default POSCheckoutPage;