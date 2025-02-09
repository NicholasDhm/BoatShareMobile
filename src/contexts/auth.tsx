import { createContext, ReactNode, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';

type AuthContextData = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  updateUser: (user: User) => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState(true);

  async function signIn(email: string, password: string) {
    try {
      setIsLoading(true);
      // API call to login user
      const mockUser = {
        id: '1',
        name: 'Nick',
        email: email,
        password: password,
        boats: []
      };

      setUser(mockUser);

      await AsyncStorage.setItem('@boatshare:user', JSON.stringify(mockUser));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function signUp(name: string, email: string, password: string) {
    try {
      setIsLoading(true);
      // API call to create user
      const mockUser = {
        id: '1',
        name: name,
        email: email,
        password: password,
        boats: []
      };

      setUser(mockUser);

      await AsyncStorage.setItem('@boatshare:user', JSON.stringify(mockUser));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function signOut() {
    try {
      setIsLoading(true);
      setUser(null);
      await AsyncStorage.removeItem('@boatshare:user');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function loadUserData() {
    try {
      const storedUser = await AsyncStorage.getItem('@boatshare:user');
      
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  useState(() => {
    loadUserData();
  });

  return (
    <AuthContext.Provider value={{
      user: user || null,
      isLoading,
      signIn,
      signOut,
      signUp,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
} 