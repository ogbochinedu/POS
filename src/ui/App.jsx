// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';
// import Sales from './components/SalesComponent';
// import Inventory from './components/Inventory';
// import TransactionHistory from './components/TransactionHistory';
// import Settings from './components/Settings';
// import ReceiptExample from './components/Receipt';



// import './App.css';
// import { Menubar } from 'primereact/menubar';
// import reactLogo from './assets/react.svg';
// import Logo from './assets/appvoltz logo.png'


// function AppContent() {
//   const location = useLocation();

//   const menuItems = [
//     {
//       label: 'Dashboard',
//       icon: 'pi pi-chart-line',
//       className: 'menu-item',
//       command: () => (window.location = '/dashboard')
//     },
//     {
//       label: 'Sales',
//       icon: 'pi pi-dollar',
//       className: 'menu-item',
//       command: () => (window.location = '/sales')
//     },
//     {
//       label: 'Inventory',
//       icon: 'pi pi-box',
//       className: 'menu-item',
//       command: () => (window.location = '/inventory')
//     },
//     {
//       label: 'Transactions',
//       icon: 'pi pi-history',
//       className: 'menu-item',
//       command: () => (window.location = '/transactionhistory')
//     },
//     {
//       label: 'Settings',
//       icon: 'pi pi-cog',
//       className: 'menu-item',
//       command: () => (window.location = '/settings')
//     },
//     {
//       label: 'Receipt Example',
//       icon: 'pi pi-cog',
//       className: 'menu-item',
//       command: () => (window.location = '/receipt')
//     },
//   ];

//   const start = (
//     <div className="flex align-items-center">
//       <img
//         alt="logo"
//         src={Logo}
//         height="40"
//         className="mr-2 animated-logo"
//       />
//       <span className="text-xl font-bold">POS System</span>
//     </div>
//   );

//   const end = (
//     <button
//       className="p-button p-button-rounded p-button-danger px-4 py-2 hover:bg-red-700 transition-colors duration-200"
//       onClick={() => (window.location = '/')}
//     >
//       <i className="pi pi-sign-out mr-2"></i>
//       Log Out
//     </button>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {location.pathname !== '/' && (
//         <div className="shadow-md">
//           <Menubar
//             model={menuItems}
//             start={start}
//             end={end}
//             className="border-none px-4 bg-white"
//           />
//         </div>
//       )}

//       <div className="main-content p-4 container mx-auto">
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/sales" element={<Sales />} />
//           <Route path="/inventory" element={<Inventory />} />
//           <Route path="/transactionhistory" element={<TransactionHistory />} />
//           <Route path="/settings" element={<Settings />} />
//           <Route path="/receipt" element={<ReceiptExample />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';
// import Sales from './components/SalesComponent';
// import Inventory from './components/Inventory';
// import TransactionHistory from './components/TransactionHistory';
// import Settings from './components/Settings';
// import ReceiptExample from './components/Receipt';
// import './App.css';
// import Logo from './assets/appvoltz logo.png';

// const styles = `
//   .navbar {
//     background-color: white;
//     padding: 0.5rem 1rem;
//     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   }

//   .navbar-container {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     max-width: 1200px;
//     margin: 0 auto;
//     padding: 0 1rem;
//   }

//   .logo-section {
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
//   }

//   .animated-logo {
//     height: 40px;
//   }

//   .brand-text {
//     font-size: 1.25rem;
//     font-weight: bold;
//   }

//   .nav-items {
//     display: flex;
//     align-items: center;
//     gap: 1.5rem;
//     list-style: none;
//     margin: 0;
//     padding: 0;
//   }

//   .nav-link {
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
//     text-decoration: none;
//     color: #4b5563;
//     padding: 0.5rem;
//     border-radius: 0.375rem;
//     transition: all 0.2s;
//   }

//   .nav-link:hover {
//     background-color: #f3f4f6;
//     color: #2563eb;
//   }

//   .nav-link.active {
//     background-color: #eff6ff;
//     color: #2563eb;
//   }

//   .logout-button {
//     background-color: #ef4444;
//     color: white;
//     border: none;
//     padding: 0.5rem 1rem;
//     border-radius: 9999px;
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
//     cursor: pointer;
//     transition: background-color 0.2s;
//   }

//   .logout-button:hover {
//     background-color: #dc2626;
//   }

//   .icon {
//     width: 1.25rem;
//     height: 1.25rem;
//   }

//   .main-content {
//     padding: 1rem;
   
//   }
// `;

// function AppContent() {
//   const location = useLocation();

//   const getIcon = (name) => {
//     switch (name) {
//       case 'dashboard':
//         return (
//           <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//           </svg>
//         );
//       case 'sales':
//         return (
//           <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//         );
//       // Add more icons as needed
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <style>{styles}</style>
      
//       {location.pathname !== '/' && (
//         <nav className="navbar">
//           <div className="navbar-container">
//             <div className="logo-section">
//               <img
//                 alt="logo"
//                 src={Logo}
//                 className="animated-logo"
//               />
//               <span className="brand-text">ACS</span>
//             </div>

//             <ul className="nav-items">
//               <li>
//                 <Link 
//                   to="/dashboard" 
//                   className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
//                 >
//                   {getIcon('dashboard')}
//                   Dashboard
//                 </Link>
//               </li>
//               <li>
//                 <Link 
//                   to="/sales" 
//                   className={`nav-link ${location.pathname === '/sales' ? 'active' : ''}`}
//                 >
//                   {getIcon('sales')}
//                   Sales
//                 </Link>
//               </li>
//               <li>
//                 <Link 
//                   to="/inventory" 
//                   className={`nav-link ${location.pathname === '/inventory' ? 'active' : ''}`}
//                 >
//                   <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//                   </svg>
//                   Inventory
//                 </Link>
//               </li>
//               <li>
//                 <Link 
//                   to="/transactionhistory" 
//                   className={`nav-link ${location.pathname === '/transactionhistory' ? 'active' : ''}`}
//                 >
//                   <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   Transactions
//                 </Link>
//               </li>
//               <li>
//                 <Link 
//                   to="/settings" 
//                   className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}
//                 >
//                   <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                   Settings
//                 </Link>
//               </li>
//             </ul>

//             <button 
//               className="logout-button"
//               onClick={() => window.location = '/'}
//             >
//               <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//               </svg>
//               Log Out
//             </button>
//           </div>
//         </nav>
//       )}

//       <div className="main-content">
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/sales" element={<Sales />} />
//           <Route path="/inventory" element={<Inventory />} />
//           <Route path="/transactionhistory" element={<TransactionHistory />} />
//           <Route path="/settings" element={<Settings />} />
//           <Route path="/receipt" element={<ReceiptExample />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Sales from './components/SalesComponent';
import Inventory from './components/Inventory';
import TransactionHistory from './components/TransactionHistory';
import Settings from './components/Settings';
import ReceiptExample from './components/Receipt';
import Logo from './assets/mimi.jpg';

const styles = `
  .app-container {
    min-height: 100vh;
    background-color: #e6f4ff;
  }

  .navbar {
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .nav-container {
   
    padding: 0 1rem;
  }

  .nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3.5rem;
  }

  .logo-section {
    display: flex;
    align-items: center;
  }

  .logo {
    height: 1.5rem;
    width: auto;
  }

  .brand-name {
    margin-left: 0.5rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: #1f2937;
  }

  .desktop-nav {
    display: none;
  }

  @media (min-width: 768px) {
    .desktop-nav {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #4b5563;
    text-decoration: none;
    transition: all 0.2s;
  }

  .nav-link:hover {
    background-color: #f3f4f6;
  }

  .nav-link.active {
    background-color: #eff6ff;
    color: #2563eb;
  }

  .nav-icon {
    width: 1rem;
    height: 1rem;
  }

  .logout-button {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    margin-left: 0.5rem;
    padding: 0.5rem 0.75rem;
    border: none;
    border-radius: 9999px;
    background-color: #ef4444;
    color: white;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .logout-button:hover {
    background-color: #dc2626;
  }

  .mobile-menu-button {
    display: flex;
    padding: 0.5rem;
    border: none;
    border-radius: 0.375rem;
    background: none;
    color: #4b5563;
    cursor: pointer;
  }

  @media (min-width: 768px) {
    .mobile-menu-button {
      display: none;
    }
  }

  .mobile-menu {
    padding: 0.5rem;
    background-color: white;
  }

  .mobile-menu .nav-link {
    padding: 0.75rem;
    width: 100%;
  }

  .mobile-menu .logout-button {
    width: 100%;
    justify-content: center;
    margin: 0.5rem 0;
  }

  .main-content {
    
    padding: 1.5rem 1rem;
  }
`;

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  console.log(location.pathname)

  const getIcon = (name) => {
    switch (name) {
      case 'dashboard':
        return (
          <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'sales':
        return (
          <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      // Add other icons similarly...
      default:
        return null;
    }
  };

  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: 'dashboard' },
    { path: '/sales', name: 'Sales', icon: 'sales' },
    { path: '/inventory', name: 'Inventory', icon: 'inventory' },
    { path: '/transactionhistory', name: 'Transactions', icon: 'transactions' },
    { path: '/settings', name: 'Settings', icon: 'settings' },
    // { path: '/receipt', name: 'receipt', icon: 'settings' }
  ];

  return (
    <div className="app-container">
      <style>{styles}</style>
      
      {location.pathname !== '/' && (
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-content">
              <div className="logo-section">
                <img src={Logo} alt="logo" className="logo" />
                <span className="brand-name">Mimi's Place 042</span>
              </div>

              <div className="desktop-nav">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  >
                    {getIcon(item.icon)}
                    <span>{item.name}</span>
                  </Link>
                ))}
                <button 
                  onClick={() => window.location = '/'}
                  className="logout-button"
                >
                  <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Log Out</span>
                </button>
              </div>

              <button
                className="mobile-menu-button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {!isMenuOpen ? (
                  <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>

            {isMenuOpen && (
              <div className="mobile-menu">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {getIcon(item.icon)}
                    <span>{item.name}</span>
                  </Link>
                ))}
                <Link 
            
                  key={'/'}
                  to={'/'}
                  className="logout-button"
                >
                  <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Log Out</span>
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/transactionhistory" element={<TransactionHistory />} />
          <Route path="/settings" element={<Settings />} />
          {/* <Route path="/receipt" element={<ReceiptExample />} /> */}
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;