import React, { createContext, useContext, useState, useEffect, ReactNode, PropsWithChildren } from 'react';
import { User, UserRole, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate Session Persistence (Check for token on mount)
  useEffect(() => {
    const storedUser = localStorage.getItem('eco_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to restore session");
        localStorage.removeItem('eco_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, role: UserRole) => {
    setIsLoading(true);
    
    // SIMULATED BACKEND CALL
    // In production: await api.post('/auth/login', { email, password })
    // Returns: JWT Token + User Object
    
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: 'u_12345',
          name: email.split('@')[0] || 'Traveler',
          email: email,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
          roles: [role], // Initial role, in real app backend sends all available roles
          activeRole: role,
          points: 1250,
          preferences: {
            currency: 'INR',
            language: 'EN',
            theme: 'light'
          }
        };

        setUser(mockUser);
        localStorage.setItem('eco_user', JSON.stringify(mockUser));
        localStorage.setItem('eco_token', 'mock_jwt_token_secure_hash_123'); // Simulate JWT
        
        setIsLoading(false);
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eco_user');
    localStorage.removeItem('eco_token');
    // In production: Call backend to invalidate session
  };

  const switchRole = (role: UserRole) => {
    if (user && user.roles.includes(role)) {
      const updatedUser = { ...user, activeRole: role };
      setUser(updatedUser);
      localStorage.setItem('eco_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      logout,
      switchRole 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};