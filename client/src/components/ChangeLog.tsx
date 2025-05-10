import React from 'react';
import { useSocket } from '../context/SocketContext';
import '../styles/App.css';

const ChangeLog: React.FC = () => {
  const { changes, users } = useSocket();

  return (
    <div className="change-log animated-border">
      <h3>Recent Changes</h3>
      <ul>
        {changes.map((change, index) => {
          const user = users.find(u => u.id === change.userId);
          return (
            <li key={index} className="new-item" style={{ color: user ? user.color : 'gray' }}>
              {user ? user.name : 'Unknown'} - {change.description} (at {new Date(change.timestamp).toLocaleTimeString()})
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChangeLog;

