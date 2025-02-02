import { CalendarDayProps } from "../../types/calendar-day";
import { Container, DayText } from "./styles";

// TEMPORARY USER ID FOR TEST PURPOSES
const userId = "a8e6596f-2517-4b18-a866-48fa9eb14d41";

export function CalendarDay({ day, reservations }: CalendarDayProps) {
  function FirstReservation() {
    if (reservations.length === 0) return null;
    return reservations.reduce((earliest, current) => {
      return new Date(earliest.createdAtIsoDate) <
        new Date(current.createdAtIsoDate)
        ? earliest
        : current;
    });
  }

  const firstReservation = FirstReservation();
  const isMine = firstReservation ? firstReservation.userId === userId : false;
  const isConfirmed = firstReservation ? firstReservation.status : false;

  return (
    <Container
      reservationType={firstReservation ? firstReservation.type : ""}
      isMine={isMine}
      isConfirmed={isConfirmed}
    >
      <DayText>{day}</DayText>
    </Container>
  );
}
