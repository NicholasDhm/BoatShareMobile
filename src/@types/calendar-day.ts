import { Reservation } from "./reservation";
import { ReservationStatus } from "./reservation-status";
import { ReservationType } from "./reservation-type";

export interface CalendarDayProps {
  day: number;
  month: number;
  year: number;
  currentMonth: number;
  isReserved: boolean;
  type: ReservationType | null;
  status: ReservationStatus | null;
  reservations?: Reservation[];
  onPress?: () => void;
}
