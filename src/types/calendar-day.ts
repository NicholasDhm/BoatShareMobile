import { Reservation } from "./reservation";

export interface CalendarDayProps {
  day: number;
  month: number;
  year: number;
  isReserved: boolean;
  reservations: Reservation[];
  currentMonth: number;
  onPress: () => void;
}
