import { Reservation } from "./reservation";

export type CalendarDayProps = {
  day: number;
  month: number;
  year: number;
  isReserved: boolean;
  reservations: Reservation[];
};
