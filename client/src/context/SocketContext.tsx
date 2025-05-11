




import React, { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { User, DocumentState, ChatMessage, Change } from '../types';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  documentState: DocumentState | null;
  currentUser: User | null;
  users: User[];
  messages: ChatMessage[];
  changes: Change[];
  connectToServer: (username: string, color: string) => void;
  updateContent: (content: string) => void;
  updateCursorPosition: (position: { line: number; ch: number }) => void;
  sendMessage: (text: string) => void;
}

const defaultState: SocketContextType = {
  socket: null,
  isConnected: false,
  documentState: null,
  currentUser: null,
  users: [],
  messages: [],
  changes: [],
  connectToServer: () => {},
  updateContent: () => {},
  updateCursorPosition: () => {},
  sendMessage: () => {},
};

const SocketContext = createContext<SocketContextType>(defaultState);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [documentState, setDocumentState] = useState<DocumentState | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [changes, setChanges] = useState<Change[]>([]);

  const connectToServer = (username: string, color: string) => {
    // const newSocket = io('http://localhost:5001', {
      const newSocket = io('https://collaborative-editor-backend-tewc.onrender.com', {

      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
      if (newSocket.id) {
        const user: User = {
          id: newSocket.id,
          name: username,
          color: color,
        };
        setCurrentUser(user);
        newSocket.emit('join', { name: username, color });
      } else {
        console.error('Socket ID is undefined on connection');
      }
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    newSocket.on('init', (data: { document: DocumentState; messages: ChatMessage[] }) => {
      setDocumentState(data.document);
      setUsers(data.document.users);
      setMessages(data.messages);
      setChanges(data.document.changes);
    });

    newSocket.on('user-joined', (updatedUsers: User[]) => {
      setUsers(updatedUsers);
    });

    newSocket.on('user-left', (updatedUsers: User[]) => {
      setUsers(updatedUsers);
    });

    newSocket.on('content-change', (data: { content: string; userId: string; changeDescription: string }) => {
      setDocumentState(prev => (prev ? { ...prev, content: data.content } : null));
      setChanges(prev => [
        ...prev,
        { userId: data.userId, description: data.changeDescription, timestamp: new Date() },
      ].slice(-10));
    });

    newSocket.on('cursor-update', (data: { userId: string; position: { line: number; ch: number } }) => {
      setUsers(prev => {
        return prev.map(user => {
          if (user.id === data.userId) {
            return { ...user, cursorPosition: data.position };
          }
          return user;
        });
      });
    });

    newSocket.on('new-message', (message: ChatMessage) => {
      setMessages(prev => [...prev, message]);
    });
  };

  const updateContent = (content: string) => {
    if (socket && isConnected && socket.id) {
      socket.emit('content-change', content);
      setDocumentState(prev => (prev ? { ...prev, content } : null));
    }
  };

  const updateCursorPosition = (position: { line: number; ch: number }) => {
    if (socket && isConnected && currentUser && socket.id) {
      socket.emit('cursor-move', position);
      setCurrentUser({ ...currentUser, cursorPosition: position });
    }
  };

  const sendMessage = (text: string) => {
    if (socket && isConnected && text.trim()) {
      socket.emit('send-message', text);
    }
  };

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        documentState,
        currentUser,
        users,
        messages,
        changes,
        connectToServer,
        updateContent,
        updateCursorPosition,
        sendMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

