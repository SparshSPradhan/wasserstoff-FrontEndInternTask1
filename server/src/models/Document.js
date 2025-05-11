"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Document = /** @class */ (function () {
    function Document() {
        this.content = '';
        this.users = new Map();
        this.changes = [];
        this.content = 'Welcome to our collaborative editor! Type something here...';
    }
    Document.prototype.getContent = function () {
        return this.content;
    };
    Document.prototype.updateContent = function (newContent) {
        this.content = newContent;
    };
    Document.prototype.addUser = function (user) {
        this.users.set(user.id, user);
    };
    Document.prototype.removeUser = function (userId) {
        this.users.delete(userId);
    };
    Document.prototype.getUser = function (userId) {
        return this.users.get(userId);
    };
    Document.prototype.getAllUsers = function () {
        return Array.from(this.users.values());
    };
    Document.prototype.updateUserCursor = function (userId, position) {
        var user = this.users.get(userId);
        if (user) {
            user.cursorPosition = position;
            this.users.set(userId, user);
        }
    };
    Document.prototype.addChange = function (change) {
        this.changes.push(change);
        this.changes = this.changes.slice(-10);
    };
    Document.prototype.getState = function () {
        return {
            content: this.content,
            users: this.getAllUsers(),
            changes: this.changes,
            messages: [],
        };
    };
    return Document;
}());
exports.default = Document;
