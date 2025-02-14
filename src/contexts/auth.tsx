import { createContext, ReactNode, useContext, useState } from 'react';
import { User } from '../@types/user';
import { usersApi } from '../apis/usersApi';
import * as Crypto from 'expo-crypto';
import { storageUserRemove, storageUserSave, storageUserGet } from '../storage/userStorage';
import { userBoatsApi } from '../apis/userBoatsApi';
import { storageUserBoatSaveMany } from '../storage/userBoatStorage';
import { boatsApi } from '../apis/boatsApi';
import { storageBoatSaveMany } from '../storage/boatStorage';
import { reservationsApi } from '../apis/reservationsApi';
import { storageReservationSaveMany } from '../storage/reservationStorage';

type AuthContextData = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  updateUser: (user: User) => void;
  getUserDataFromApi: () => Promise<void>;
  getUserBoatsFromApi: () => Promise<void>;
  getBoatsFromApi: () => Promise<void>;
  getReservationsFromApi: () => Promise<void>;
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
      try {
        const allUsers = await usersApi.getUsers();
        const passwordHash = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          password
        );
        const uniqueUser = allUsers.find(user =>
          user.email === email &&
          user.passwordHash === passwordHash
        );
        if (!uniqueUser) {
          throw new Error('Invalid email or password');
        }
        setUser(uniqueUser);
        await storageUserSave(uniqueUser);
        await getUserDataFromApi();
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function signUp(name: string, email: string, password: string) {
    try {
      setIsLoading(true);
      await usersApi.createUser(name, email, password);

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
      await storageUserRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function getUserDataFromApi() {
    try {
      setIsLoading(true);
      const storedUser = await storageUserGet();
      if (storedUser) {
        setUser(storedUser);
        const apiUserBoats = await userBoatsApi.getUserBoatsByUserId(storedUser.userId);
        await storageUserBoatSaveMany(apiUserBoats);
        const apiBoats = await boatsApi.getBoatsByUserId(storedUser.userId);
        await storageBoatSaveMany(apiBoats);
        const apiReservations = await reservationsApi.getReservationsByUserId(storedUser.userId);
        await storageReservationSaveMany(apiReservations);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getUserBoatsFromApi() {
    try {
      const storedUser = await storageUserGet();
      if (storedUser) {
        const apiUserBoats = await userBoatsApi.getUserBoatsByUserId(storedUser.userId);
        await storageUserBoatSaveMany(apiUserBoats);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getBoatsFromApi() {
    try {
      const storedUser = await storageUserGet();
      if (storedUser) {
        const apiBoats = await boatsApi.getBoatsByUserId(storedUser.userId);
        await storageBoatSaveMany(apiBoats);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getReservationsFromApi() {
    try {
      const storedUser = await storageUserGet();
      if (storedUser) {
        const apiReservations = await reservationsApi.getReservationsByUserId(storedUser.userId);
        await storageReservationSaveMany(apiReservations);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  useState(() => {
    getUserDataFromApi();
  });

  return (
    <AuthContext.Provider value={{
      user: user || null,
      isLoading,
      signIn,
      signOut,
      signUp,
      updateUser,
      getUserDataFromApi,
      getUserBoatsFromApi,
      getBoatsFromApi,
      getReservationsFromApi,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
} 