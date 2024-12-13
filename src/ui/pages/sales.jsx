import React from 'react';

import { useState } from 'react';

const Login = () => {
  
  const [count, setCount] = useState(0)
  return (
    <div>
      
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;


