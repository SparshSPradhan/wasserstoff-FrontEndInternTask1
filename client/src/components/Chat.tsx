import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import '../styles/chat.css';

const Chat: React.FC = () => {
  const { messages, users, currentUser, sendMessage } = useSocket();
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="chat-container animated-border">
      <div className="chat-messages">
        {messages.map(msg => {
          const user = users.find(u => u.id === msg.userId);
          return (
            <div
              key={msg.id}
              className={`message ${msg.userId === currentUser?.id ? 'own' : 'other'}`}
              style={{ backgroundColor: user ? user.color : 'gray' }}
            >
              <strong>{user ? user.name : 'Unknown'}:</strong> {msg.text}
              <br />
              <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSend} className="chat-input">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;