






import { User, DocumentState, Change } from '../types';

class Document {
  private content: string = '';
  private users: Map<string, User> = new Map();
  private changes: Change[] = [];

  constructor() {
    this.content = 'Welcome to our collaborative editor! Type something here...';
  }

  getContent(): string {
    return this.content;
  }

  updateContent(newContent: string): void {
    this.content = newContent;
  }

  addUser(user: User): void {
    this.users.set(user.id, user);
  }

  removeUser(userId: string): void {
    this.users.delete(userId);
  }

  getUser(userId: string): User | undefined {
    return this.users.get(userId);
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  updateUserCursor(userId: string, position: { line: number; ch: number }): void {
    const user = this.users.get(userId);
    if (user) {
      user.cursorPosition = position;
      this.users.set(userId, user);
    }
  }

  addChange(change: Change): void {
    this.changes.push(change);
    this.changes = this.changes.slice(-10);
  }

  getState(): DocumentState {
    return {
      content: this.content,
      users: this.getAllUsers(),
      changes: this.changes,
      messages: [],
    };
  }
}

export default Document;

