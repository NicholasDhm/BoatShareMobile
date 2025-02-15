import { ReservationStatus } from "./reservation-status";
import { ReservationType } from "./reservation-type";

export type Reservation = {
  id: string;
  boatId: string;
  date: string;
  createdAtDate: string;
  type: ReservationType;
  status: ReservationStatus;
};
