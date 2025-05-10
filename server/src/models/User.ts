import { User as UserType } from '../types';

class User {
  private users: Map<string, UserType> = new Map();
  
  addUser(user: UserType): void {
    this.users.set(user.id, user);
  }
  
  removeUser(userId: string): void {
    this.users.delete(userId);
  }
  
  getUser(userId: string): UserType | undefined {
    return this.users.get(userId);
  }
  
  getAllUsers(): UserType[] {
    return Array.from(this.users.values());
  }
}

export default User;