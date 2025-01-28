import React from "react";
import { FlatList } from "react-native";
import { CalendarHeader } from "../calendar-header/calendar-header";
import { CalendarDayProps } from "../../types/calendar-day";
import { CalendarDay } from "../calendar-day/calendar-day";
import { Container } from "./styles";
import { CalendarSubheader } from "../calendar-subheader/calendar-subheader";

function generateCalendar(month: number, year: number): CalendarDayProps[] {
  const daysInWeek = 7;
  const date = new Date(year, month - 1, 1); // Start of the month (month is 0-indexed)

  const firstDayOfWeek = date.getDay(); // Day of the week for the 1st of the month (0 = Sunday, 6 = Saturday)
  const daysInMonth = new Date(year, month, 0).getDate(); // Total days in the given month

  // Get the previous month's total days
  const prevMonthDays = new Date(year, month - 1, 0).getDate();

  let currentDay = 1 - firstDayOfWeek; // Start with the offset for the previous month
  const daysOfMonth: {
    day: number;
    month: number;
    year: number;
    isReserved: boolean;
  }[] = [];

  while (currentDay <= daysInMonth) {
    for (let i = 0; i < daysInWeek; i++) {
      if (currentDay < 1) {
        // Previous month's days
        daysOfMonth.push({
          day: prevMonthDays + currentDay,
          month: month - 1 === 0 ? 12 : month - 1, // Adjust for January
          year: month - 1 === 0 ? year - 1 : year,
          isReserved: false,
        });
      } else if (currentDay > daysInMonth) {
        // Next month's days
        daysOfMonth.push({
          day: currentDay - daysInMonth,
          month: month + 1 === 13 ? 1 : month + 1, // Adjust for December
          year: month + 1 === 13 ? year + 1 : year,
          isReserved: false,
        });
      } else {
        // Current month's days
        daysOfMonth.push({
          day: currentDay,
          month: month,
          year: year,
          isReserved: false,
        });
      }
      currentDay++;
    }
  }

  return daysOfMonth;
}

export function Calendar() {
  return (
    <Container>
      <CalendarHeader />
      <CalendarSubheader />
      <FlatList
        data={generateCalendar(
          new Date().getMonth() + 1,
          new Date().getFullYear()
        )}
        renderItem={({ item }) => <CalendarDay {...item} />}
        keyExtractor={(item) => item.toString()}
        numColumns={7}
      />
    </Container>
  );
}
