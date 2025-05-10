// import React from 'react';
// import { useSocket } from './context/SocketContext';
// import Login from './components/Login';
// import Header from './components/Header';
// import Editor from './components/Editor';
// import UserList from './components/UserList';
// import './styles/App.css';


// const App: React.FC = () => {
//   const { isConnected } = useSocket();

//   return (
//     <div className="app">
//       {!isConnected ? (
//         <Login />
//       ) : (
//         <>
//           <Header />
//           <div className="main-content">
//             <Editor />
//             <UserList />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default App;



import React, { useState } from 'react';
import { useSocket } from './context/SocketContext';
import Login from './components/Login';
import Header from './components/Header';
import Editor from './components/Editor';
import UserList from './components/UserList';
import Chat from './components/Chat';
import ChangeLog from './components/ChangeLog';
import './styles/App.css';

const App: React.FC = () => {
  const { isConnected } = useSocket();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      {!isConnected ? (
        <Login />
      ) : (
        <>
          <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          <div className="main-content">
            <Editor />
            <div>
              <Chat />
              <UserList />
              <ChangeLog />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;