import { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthContextType, UserRole } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demonstration
const mockUsers = [
  {
    id: '1',
    name: 'Admin Perpustakaan',
    email: 'admin@library.com',
    role: 'admin' as UserRole,
    joinDate: '2024-01-01',
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'member@library.com',
    role: 'member' as UserRole,
    membershipNumber: 'M001',
    joinDate: '2024-01-15',
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock login - in real app, this would call your Laravel backend
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password') {
      setUser(foundUser);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (userData: Omit<User, 'id' | 'joinDate'>) => {
    // Mock register - in real app, this would call your Laravel backend
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      joinDate: new Date().toISOString(),
    };
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      register,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}