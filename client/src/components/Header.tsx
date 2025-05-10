// import React from 'react';
// import { useSocket } from '../context/SocketContext';
// import '../styles/Header.css';

// const Header: React.FC = () => {
//   const { currentUser, users } = useSocket();

//   return (
//     <header className="editor-header">
//       <div className="header-title">
//         <h1>Collaborative Editor</h1>
//       </div>
//       <div className="header-info">
//         {currentUser && (
//           <div className="current-user">
//             <span 
//               className="user-color-dot" 
//               style={{ backgroundColor: currentUser.color }}
//             ></span>
//             <span className="user-name">{currentUser.name} (You)</span>
//           </div>
//         )}
//         <div className="online-users">
//           <span className="online-count">{users.length} users online</span>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


import React from 'react';
import { useSocket } from '../context/SocketContext';
import '../styles/Header.css';

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode }) => {
  const { currentUser, users } = useSocket();

  return (
    <header className="editor-header">
      <div className="header-title">
        <h1>Collaborative Editor</h1>
      </div>
      <div className="header-info">
        {currentUser && (
          <div className="current-user">
            <span className="user-color-dot" style={{ backgroundColor: currentUser.color }}></span>
            <span className="user-name">{currentUser.name} (You)</span>
          </div>
        )}
        <div className="online-users">
          <span className="online-count">{users.length} users online</span>
        </div>
        <button onClick={toggleTheme} className="theme-toggle">
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
};

export default Header;