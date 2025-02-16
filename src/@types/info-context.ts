import { Contract } from "./contract";
import { Reservation } from "./reservation";
import { Boat } from "./boat";
import { User } from "./user";

export type InfoContextData = {
  currentUserContracts: Contract[];
  currentUserReservations: Reservation[];
  currentBoatReservations: Reservation[];
  currentUserBoats: Boat[];
  boatSelectedInDropdown: Boat | null;
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  setBoatSelectedInDropdown: (boat: Boat) => void;
  fetchReservations: () => Promise<void>;
  fetchBoats: () => Promise<void>;
  fetchContracts: () => Promise<void>;
  fetchReservationsForCurrentBoat: () => Promise<void>;
};
