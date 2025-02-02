import { CalendarDayProps } from "../../types/calendar-day";
import { Container, DayText } from "./styles";

export function CalendarDay({ day, reservations }: CalendarDayProps) {
  return (
    <Container>
      <DayText>{day}</DayText>
      {reservations.length > 0 && (
        <DayText>Reserved by {reservations.length} people</DayText>
      )}
    </Container>
  );
}