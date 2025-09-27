import { User } from '@/types/auth';

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: 'member' | 'admin';
}

export interface UpdateUserData extends Partial<CreateUserData> {
  id: string;
}

class UserService {
  private baseUrl = 'http://localhost:8000/api/users';

  async getAllUsers(): Promise<User[]> {
    // TODO: Replace with actual Laravel API call
    const response = await fetch(this.baseUrl, {
      headers: {
        'Authorization': `Bearer ${this.getToken()}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return response.json();
  }

  async getUser(id: string): Promise<User> {
    // TODO: Replace with actual Laravel API call
    const response = await fetch(`${this.baseUrl}/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.getToken()}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('User not found');
    }

    return response.json();
  }

  async createUser(userData: CreateUserData): Promise<User> {
    // TODO: Replace with actual Laravel API call
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    return response.json();
  }

  async updateUser(userData: UpdateUserData): Promise<User> {
    // TODO: Replace with actual Laravel API call
    const response = await fetch(`${this.baseUrl}/${userData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    return response.json();
  }

  async deleteUser(id: string): Promise<void> {
    // TODO: Replace with actual Laravel API call
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }
}

export const userService = new UserService();