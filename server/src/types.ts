



export interface User {
    id: string;
    name: string;
    color: string;
    cursorPosition?: CursorPosition;
  }
  
  export interface CursorPosition {
    line: number;
    ch: number;
  }
  
  export interface Change {
    userId: string;
    description: string;
    timestamp: Date;
  }
  
  export interface ChatMessage {
    id: string;
    userId: string;
    text: string;
    timestamp: Date;
  }
  
  export interface DocumentState {
    content: string;
    users: User[];
    changes: Change[];
    messages: ChatMessage[];
  }


