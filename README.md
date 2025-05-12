# Real-Time Collaborative Text Editor

A real-time collaborative text editor where multiple users can edit the same document simultaneously and see each other's changes live. The application includes features like user identification with unique names and colors, cursor position tracking, and real-time document synchronization.

## Features

- **Real-time collaboration**: Changes made by one user instantly appear for all others
- **User identification**: Each user has a unique name and color
- **Cursor tracking**: See where other users are editing in real-time
- **Simple login system**: Join with just a username
- **Clean, minimalist UI**: Focus on the content and collaboration

## Technologies Used

- **Frontend**: React, TypeScript
- **Backend**: Node.js, Express
- **Real-time Communication**: Socket.io
- **Styling**: Custom CSS (no Tailwind as requested)

## Project Structure

```
collaborative-editor/
├── client/                     # Frontend React application
│   ├── public/                 # Static files
│   └── src/                    # React source code
│       ├── components/         # React components
│       ├── contexts/           # Context providers
│       ├── types/              # TypeScript types
│       └── utils/              # Utility functions
├── server/                     # Backend Node.js application
│   └── src/                    # Server source code
└── package.json                # Root package.json for scripts
```

## Setup Instructions

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sparshspradhan/collaborative-editor.git
   cd collaborative-editor
   ```

2. Install dependencies:
   ```bash
   npm run install:all
   ```

### Running the Application

1. Start both the client and server:
   ```bash
   npm start
   ```

   This will start:
   - Client on http://localhost:3000
   - Server on http://localhost:5001

2. Open multiple browser windows/tabs pointing to http://localhost:3000 to test the collaborative editing functionality.

## How It Works

1. **Authentication**: Users enter a username to join the editing session
2. **Document Synchronization**: All users see the same document content
3. **Real-time Updates**: Changes are broadcast to all connected clients using Socket.io
4. **Cursor Tracking**: The position of each user's cursor is tracked and displayed for others
5. **User Management**: Connected users are listed with their names and colors

## Testing the Collaboration

To test the real-time collaboration features:

1. Open the application in multiple browser windows or tabs
2. Log in with different usernames in each window
3. Make changes in one window and observe them appearing in the other windows
4. Notice how user cursors are tracked across all sessions
5. See the list of active users update as windows are opened or closed

## Future Enhancements

- Rich text formatting
- History/undo functionality
- User presence indicators (typing, idle, etc.)
- Document saving and loading
- Multiple document support
- Access controls and permissions

## Live Vercel Deployment Link- https://wasserstoff-front-end-intern-task1-client-sparsh.vercel.app/
## Live Render Deployment Link- https://collaborative-editor-backend-tewc.onrender.com
