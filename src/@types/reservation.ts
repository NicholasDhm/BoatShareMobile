import { ReservationStatus } from "./reservation-status";
import { ReservationType } from "./reservation-type";

export type Reservation = {
  id: string;
  contractId: string;
  date: string;
  createdAt: string;
  type: ReservationType;
  status: ReservationStatus;
};
