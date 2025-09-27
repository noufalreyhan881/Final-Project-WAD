import { User } from '@/types/auth';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'member' | 'admin';
}

class AuthService {
  private baseUrl = 'http://localhost:8000/api'; // Laravel API base URL

  async login(credentials: LoginCredentials): Promise<User> {
    // TODO: Replace with actual Laravel API call
    const response = await fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    return data.user;
  }

  async register(userData: RegisterData): Promise<User> {
    // TODO: Replace with actual Laravel API call
    const response = await fetch(`${this.baseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    return data.user;
  }

  async logout(): Promise<void> {
    // TODO: Replace with actual Laravel API call
    await fetch(`${this.baseUrl}/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.getToken()}`,
      },
    });
    
    this.removeToken();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }
}

export const authService = new AuthService();