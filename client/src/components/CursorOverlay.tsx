import React from 'react';
import { useSocket } from '../context/SocketContext';
import { User } from '../types';

interface CursorOverlayProps {
  editorRef: React.RefObject<HTMLDivElement>;
}

const CursorOverlay: React.FC<CursorOverlayProps> = ({ editorRef }) => {
  const { users, currentUser } = useSocket();
  
  // Filter out the current user and users without cursor positions
  const remoteCursors = users.filter(
    (user) => user.id !== currentUser?.id && user.cursorPosition
  );

  if (!editorRef.current || remoteCursors.length === 0) return null;

  // Calculate line height based on editor styles
  const computedStyle = window.getComputedStyle(editorRef.current);
  const lineHeight = parseInt(computedStyle.lineHeight) || 20;
  const fontSize = parseInt(computedStyle.fontSize) || 16;
  
  return (
    <div className="cursor-overlay">
      {remoteCursors.map((user: User) => {
        if (!user.cursorPosition) return null;
        
        // Position cursor at the right location
        const top = user.cursorPosition.line * lineHeight;
        const left = user.cursorPosition.ch * (fontSize * 0.6); // Approximate character width
        
        return (
          <div key={user.id} className="remote-cursor" style={{ top, left }}>
            <div className="cursor-caret" style={{ backgroundColor: user.color }}></div>
            <div className="cursor-flag" style={{ backgroundColor: user.color }}>
              {user.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CursorOverlay;


