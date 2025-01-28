import { ReservationType } from "./reservation-type";

export type CalendarDayProps = {
  day: number;
  month: number;
  year: number;
  isReserved: boolean;
  reservationType?: ReservationType;
}

