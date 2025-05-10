export interface User {
    id: string; // We still define it as required for our app functionality
    name: string;
    color: string;
    cursorPosition?: {
      line: number;
      ch: number;
    };
  }
  
  export interface DocumentState {
    content: string;
    users: User[];
    changes: any[];
  }



