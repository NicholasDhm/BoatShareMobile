import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
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
  const [currentBoatReservations, setCurrentBoatReservations] = useState<Reservation[]>([]);

  async function signIn(email: string, password: string) {
    try {
      setIsLoading(true);
      try {
        const response = await authApi.login(email, password);
        await setUser(response.user);
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
      setCurrentBoatReservations([]);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  // This is used to fetch the reservations for the current user and display them in the Profile screen
  async function fetchReservations() {
    if (user) {
      const newUserReservations = await reservationsApi.getReservationsByUserId(user.id);
      setCurrentUserReservations(newUserReservations);
    }
  }

  // This is used to fetch the boats for the current user and display them in the Profile screen
  async function fetchBoats() {
    if (user) {
      const newUserBoats = await boatsApi.getBoatsByUserId(user.id);
      setCurrentUserBoats(newUserBoats);
      if (boatSelectedInDropdown === null) {
        await setBoatSelectedInDropdown(newUserBoats[0]);
        await fetchReservationsForCurrentBoat();
      }
    }
  }

  async function fetchContracts() {
    if (user) {
      const newUserContracts = await contractsApi.getContractsByUserId(user.id);
      setCurrentUserContracts(newUserContracts);
    }
  }

  // This is used to fetch the reservations for the current boat and display them in the calendar
  async function fetchReservationsForCurrentBoat() {
    if (user && boatSelectedInDropdown) {
      const newBoatReservations = await reservationsApi.getReservationsByBoatId(boatSelectedInDropdown.id);
      setCurrentBoatReservations(newBoatReservations);
    }
  }

  useEffect(() => {
    if (user) {
      fetchBoats();
      fetchReservations();
      fetchContracts();
    }
  }, [user]);

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
      setBoatSelectedInDropdown,
      currentBoatReservations,
      fetchReservations,
      fetchBoats,
      fetchContracts,
      fetchReservationsForCurrentBoat,
    }}>
      {children}
    </InfoContext.Provider>
  );
}

export function useInfo() {
  const context = useContext(InfoContext);
  return context;
} 