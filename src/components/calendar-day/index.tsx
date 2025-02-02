import { CalendarDayProps } from "../../types/calendar-day";
import { Container, DayText } from "./styles";

export function CalendarDay({ day, reservations }: CalendarDayProps) {
  function FirstReservation() {
    return reservations.reduce((earliest, current) => {
      return new Date(earliest.createdAtIsoDate) < new Date(current.createdAtIsoDate) ? earliest : current;
    });
  }


  return (
    <Container>
      <DayText>{day}</DayText>
      {reservations.length > 0 && (
        <DayText>{FirstReservation().type}</DayText>
      )}
    </Container>
  );
}