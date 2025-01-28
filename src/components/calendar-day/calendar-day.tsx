import { CalendarDayProps } from "../../types/calendar-day";
import { Container, DayText } from "./styles";

export function CalendarDay(calendarDay: CalendarDayProps) {
  return (
    <Container>
      <DayText>{calendarDay.day}</DayText>
    </Container>
  );
}
