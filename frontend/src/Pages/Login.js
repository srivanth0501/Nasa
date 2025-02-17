import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Services/Api';
import SolarSystem from '../Components/Solar';
import '../Pages/Login.css'; 
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.token);
      navigate('/home');
    } catch (err) {
      setError(err.error || 'Login failed');
    }
  };

  return (
    <div className="login-page">

      <div className="solar-background">
        <SolarSystem />
      </div>

      <div className="login-container">
        <h2>NASA Portal Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
