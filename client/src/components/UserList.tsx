import React from 'react';
import { useSocket } from '../context/SocketContext';
import '../styles/UserList.css';

const UserList: React.FC = () => {
  const { users, currentUser } = useSocket();

  return (
    <div className="user-list">
      <h3>Active Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <span 
              className="user-color-dot" 
              style={{ backgroundColor: user.color }}
            ></span>
            <span className="user-name">
              {user.name} {user.id === currentUser?.id ? '(You)' : ''}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;