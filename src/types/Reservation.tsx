import { ReservationStatus } from "./reservation-status";
import { ReservationType } from "./reservation-type";

export type Reservation = {
  reservationId: string;
  boatId: string;
  userId: string;
  createdAtIsoDate: string;
  day: number;
  month: number;
  year: number;
  type: ReservationType;
  status: ReservationStatus;
};
