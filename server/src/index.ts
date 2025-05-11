




import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import Document from './models/Document';
import { User, ChatMessage, Change } from './types';
import diffMatchPatch from 'diff-match-patch';

const dmp = new diffMatchPatch();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;
const document = new Document();
let chatMessages: ChatMessage[] = [];
let changes: Change[] = [];

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join', (userData: { name: string; color: string }) => {
    const user: User = {
      id: socket.id,
      name: userData.name,
      color: userData.color,
    };

    document.addUser(user);

    socket.emit('init', {
      document: document.getState(),
      messages: chatMessages,
    });

    io.emit('user-joined', document.getAllUsers());

    console.log(`User ${user.name} joined with ID: ${socket.id}`);
  });

  socket.on('content-change', (content: string) => {
    const oldContent = document.getContent();
    const diff: [number, string][] = dmp.diff_main(oldContent, content);
    dmp.diff_cleanupSemantic(diff);
    const changeDescription = diff
      .map(([op, text]: [number, string]) => {
        if (op === 1) return `+${text}`;
        if (op === -1) return `-${text}`;
        return '';
      })
      .filter((s: string) => s)
      .join(' ');

    document.updateContent(content);
    changes.push({
      userId: socket.id,
      description: changeDescription,
      timestamp: new Date(),
    });
    changes = changes.slice(-10);

    io.emit('content-change', {
      content,
      userId: socket.id,
      changeDescription,
    });
  });

  socket.on('cursor-move', (position: { line: number; ch: number }) => {
    document.updateUserCursor(socket.id, position);
    socket.broadcast.emit('cursor-update', {
      userId: socket.id,
      position,
    });
  });

  socket.on('send-message', (text: string) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: socket.id,
      text,
      timestamp: new Date(),
    };
    chatMessages.push(message);
    chatMessages = chatMessages.slice(-50);
    io.emit('new-message', message);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    document.removeUser(socket.id);
    io.emit('user-left', document.getAllUsers());
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





