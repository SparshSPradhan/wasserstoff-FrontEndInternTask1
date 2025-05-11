"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = require("socket.io");
var cors_1 = __importDefault(require("cors"));
var Document_1 = __importDefault(require("./models/Document"));
var diff_match_patch_1 = __importDefault(require("diff-match-patch"));
var dmp = new diff_match_patch_1.default();
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
var PORT = process.env.PORT || 5001;
var document = new Document_1.default();
var chatMessages = [];
var changes = [];
io.on('connection', function (socket) {
    console.log("User connected: ".concat(socket.id));
    socket.on('join', function (userData) {
        var user = {
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
        console.log("User ".concat(user.name, " joined with ID: ").concat(socket.id));
    });
    socket.on('content-change', function (content) {
        var oldContent = document.getContent();
        var diff = dmp.diff_main(oldContent, content);
        dmp.diff_cleanupSemantic(diff);
        var changeDescription = diff
            .map(function (_a) {
            var op = _a[0], text = _a[1];
            if (op === 1)
                return "+".concat(text);
            if (op === -1)
                return "-".concat(text);
            return '';
        })
            .filter(function (s) { return s; })
            .join(' ');
        document.updateContent(content);
        changes.push({
            userId: socket.id,
            description: changeDescription,
            timestamp: new Date(),
        });
        changes = changes.slice(-10);
        io.emit('content-change', {
            content: content,
            userId: socket.id,
            changeDescription: changeDescription,
        });
    });
    socket.on('cursor-move', function (position) {
        document.updateUserCursor(socket.id, position);
        socket.broadcast.emit('cursor-update', {
            userId: socket.id,
            position: position,
        });
    });
    socket.on('send-message', function (text) {
        var message = {
            id: Date.now().toString(),
            userId: socket.id,
            text: text,
            timestamp: new Date(),
        };
        chatMessages.push(message);
        chatMessages = chatMessages.slice(-50);
        io.emit('new-message', message);
    });
    socket.on('disconnect', function () {
        console.log("User disconnected: ".concat(socket.id));
        document.removeUser(socket.id);
        io.emit('user-left', document.getAllUsers());
    });
});
server.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
