import { ReservationStatus } from "./reservation-status";
import { ReservationType } from "./reservation-type";

export type Reservation = {
  reservationId: string;
  userBoatId: string;
  date: string;
  createdAtDate: string;
  type: ReservationType;
  status: ReservationStatus;
};
