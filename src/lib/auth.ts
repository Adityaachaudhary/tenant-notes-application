import { User } from '@/types';
import { mockUsers } from './mockData';

const AUTH_STORAGE_KEY = 'saas-notes-auth';

export class AuthService {
  static getCurrentUser(): User | null {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;
    
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }

  static async login(email: string, password: string): Promise<User | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real app, this would be an API call
    if (password !== 'password') {
      throw new Error('Invalid credentials');
    }
    
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }
    
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  static logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}