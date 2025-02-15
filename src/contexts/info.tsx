import { createContext, ReactNode, useContext, useState } from 'react';
import { User } from '../@types/user';
import { usersApi } from '../apis/usersApi';
import { InfoContextData } from '../@types/info-context';
import { Contract } from '../@types/contract';
import { Reservation } from '../@types/reservation';
import { Boat } from '../@types/boat';
import { boatsApi } from '../apis/boatsApi';
import { reservationsApi } from '../apis/reservationsApi';
import { contractsApi } from '../apis/contractsApi';
import { authApi } from '../apis/authApi';

type InfoProviderProps = {
  children: ReactNode;
};

const InfoContext = createContext<InfoContextData>({} as InfoContextData);

export function InfoProvider({ children }: InfoProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [currentUserContracts, setCurrentUserContracts] = useState<Contract[]>([]);
  const [currentUserReservations, setCurrentUserReservations] = useState<Reservation[]>([]);
  const [currentUserBoats, setCurrentUserBoats] = useState<Boat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [boatSelectedInDropdown, setBoatSelectedInDropdown] = useState<Boat | null>(null);

  async function signIn(email: string, password: string) {
    try {
      setIsLoading(true);
      try {
        const response = await authApi.login(email, password);
        setUser(response.user);
        await updateAllDataByFetchingFromApi();
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
      await signIn(email, password);
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
      setCurrentUserContracts([]);
      setCurrentUserReservations([]);
      setCurrentUserBoats([]);
      setBoatSelectedInDropdown(null);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function updateAllDataByFetchingFromApi() {
    try {
      if (user) {
        const newUserInfo = await usersApi.getUserById(user.id);
        setUser(newUserInfo);
        const newUserContracts = await contractsApi.getContractsByUserId(user.id);
        setCurrentUserContracts(newUserContracts);
        const newUserReservations = await reservationsApi.getReservationsByUserId(user.id);
        setCurrentUserReservations(newUserReservations);
        const newUserBoats = await boatsApi.getBoatsByUserId(user.id);
        setCurrentUserBoats(newUserBoats);
      }
    } catch (error) {
      throw error;
    }
  }

  async function fetchReservations() {
    if (user) {
      const newUserReservations = await reservationsApi.getReservationsByUserId(user.id);
      setCurrentUserReservations(newUserReservations);
    }
  }

  return (
    <InfoContext.Provider value={{
      user: user || null,
      isLoading,
      signIn,
      signOut,
      signUp,
      currentUserContracts,
      currentUserReservations,
      currentUserBoats,
      boatSelectedInDropdown,
      setUser,
      setCurrentUserContracts,
      setCurrentUserReservations,
      setCurrentUserBoats,
      setBoatSelectedInDropdown,
      updateAllDataByFetchingFromApi,
      fetchReservations,
    }}>
      {children}
    </InfoContext.Provider>
  );
}

export function useInfo() {
  const context = useContext(InfoContext);
  return context;
} 