import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import reactLogo from '../assets/react.svg';
import Logo from '../assets/mimi.jpg';
import BackgroundImage from '../assets/bgpos.jpg'; // Import your background image here
import useUsers from '../../hooks/useUsers';

const styles = `
  .login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-image: url('${BackgroundImage}'); /* Set the background image */
    background-size: cover; /* Ensure the image covers the entire area */
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Prevent tiling */
    padding: 1rem;
  }

  .login-card {
    background: rgba(255, 255, 255, 0.85); /* Semi-transparent background for contrast */
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }

  .text-center {
    text-align: center;
  }

  .mb-5 {
    margin-bottom: 2rem;
  }

  .mb-3 {
    margin-bottom: 1rem;
  }

  .mb-4 {
    margin-bottom: 1.5rem;
  }

  .logo-image {
    height: 50px;
    margin-bottom: 1rem;
  }

  .welcome-text {
    color: #1f2937;
    font-size: 1.875rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  .form-label {
    display: block;
    color: #1f2937;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .form-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  .form-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }

  .form-input::placeholder {
    color: #9ca3af;
  }

  .sign-in-button {
    width: 100%;
    padding: 0.75rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .sign-in-button:hover {
    background-color: #2563eb;
  }

  /* Responsive width classes */
  @media (min-width: 640px) {
    .login-card {
      max-width: 66.666667%;
    }
  }

  @media (min-width: 768px) {
    .login-card {
      max-width: 50%;
    }
  }

  @media (min-width: 1024px) {
    .login-card {
      max-width: 33.333333%;
    }
  }
`;

const Login = () => {
  const{} = useUsers();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add login logic here
    navigate('/dashboard');
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-container">
        <div className="login-card">
          <div className="text-center mb-5">
            <img
              src={Logo}
              alt="POS Logo"
              className="logo-image w-32 h-32"
            />
            <div className="welcome-text">Welcome Back</div>
          </div>

          <div>
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="form-input mb-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="form-input mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="mb-4">
              {/* Add Remember me and Forgot password here if needed */}
            </div>

            <button className="sign-in-button" onClick={handleLogin}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
