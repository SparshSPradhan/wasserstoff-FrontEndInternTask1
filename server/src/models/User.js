"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User() {
        this.users = new Map();
    }
    User.prototype.addUser = function (user) {
        this.users.set(user.id, user);
    };
    User.prototype.removeUser = function (userId) {
        this.users.delete(userId);
    };
    User.prototype.getUser = function (userId) {
        return this.users.get(userId);
    };
    User.prototype.getAllUsers = function () {
        return Array.from(this.users.values());
    };
    return User;
}());
exports.default = User;
