import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './ManagerLogin.css';

function ManagerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
        const response = await axios.post('http://localhost:8080/api/v1/managers/login', { email, password });
        
        console.log('Login successful', response.data);
        
        const managerId = response.data.managerId; // Correctly extract managerId from response data
        
        history.push(`/managers/${managerId}/missions`);
        //Create an axios.get here that gives me all logic needed for manager
        
    } catch (error) {
        setErrorMessage('Invalid email or password. Please try again.');
        console.error('Login failed', error);
    }
};

  return (
    <div className="manager-login-container">
      <h2>Manager Login</h2>
      <input 
        type="text" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleLogin}>Login</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default ManagerLogin;
