import {
  createContext,
  useContext,
  useState,
  type ReactNode
} from 'react';

import { testUsers, type User } from './users';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('gestorpro_user');

    return savedUser ? JSON.parse(savedUser) as User : null;
  });

  const login = (email: string, password: string): boolean => {
    const foundUser = testUsers.find(
      (item) => item.email === email && item.password === password
    );

    if (!foundUser) {
      return false;
    }

    setUser(foundUser);
    localStorage.setItem('gestorpro_user', JSON.stringify(foundUser));

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gestorpro_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe utilizarse dentro de AuthProvider');
  }

  return context;
}