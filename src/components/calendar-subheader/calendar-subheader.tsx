import { Container, WeekDay } from "./styles";

export function CalendarSubheader() {
  return (
    <Container>
      <WeekDay>Sun</WeekDay>
      <WeekDay>Mon</WeekDay>
      <WeekDay>Tue</WeekDay>
      <WeekDay>Wed</WeekDay>
      <WeekDay>Thu</WeekDay>
      <WeekDay>Fri</WeekDay>
      <WeekDay>Sat</WeekDay>
    </Container>
  );
}
