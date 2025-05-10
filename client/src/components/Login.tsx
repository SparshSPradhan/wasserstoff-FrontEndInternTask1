import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { getRandomColor } from '../utils/colors';
import '../styles/Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const { connectToServer } = useSocket();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username.trim()) {
      const color = getRandomColor();
      connectToServer(username, color);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Collaborative Editor</h2>
        <p>Join the collaborative editing session</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Enter your name</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>
          <button type="submit" className="login-button">Join Session</button>
        </form>
      </div>
    </div>
  );
};

export default Login;