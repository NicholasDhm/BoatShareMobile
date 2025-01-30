import React, { useState } from "react";
import { FlatList } from "react-native";
import { CalendarHeader } from "../calendar-header";
import { CalendarDayProps } from "../../types/calendar-day";
import { CalendarDay } from "../calendar-day";
import { Container } from "./styles";
import { CalendarSubheader } from "../calendar-subheader";

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  function handlePressRight() {
    if (currentMonth === 12) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }

  function handleLeftRight() {
    if (currentMonth === 1) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }

  function generateCalendar(): CalendarDayProps[] {
    const daysInWeek = 7;
    const date = new Date(currentYear, currentMonth - 1, 1); // Start of the month (month is 0-indexed)

    const firstDayOfWeek = date.getDay(); // Day of the week for the 1st of the month (0 = Sunday, 6 = Saturday)
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate(); // Total days in the given month

    // Get the previous month's total days
    const prevMonthDays = new Date(currentYear, currentMonth - 1, 0).getDate();

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
            month: currentMonth - 1 === 0 ? 12 : currentMonth - 1, // Adjust for January
            year: currentMonth - 1 === 0 ? currentYear - 1 : currentYear,
            isReserved: false,
          });
        } else if (currentDay > daysInMonth) {
          // Next month's days
          daysOfMonth.push({
            day: currentDay - daysInMonth,
            month: currentMonth + 1 === 13 ? 1 : currentMonth + 1, // Adjust for December
            year: currentMonth + 1 === 13 ? currentYear + 1 : currentYear,
            isReserved: false,
          });
        } else {
          // Current month's days
          daysOfMonth.push({
            day: currentDay,
            month: currentMonth,
            year: currentYear,
            isReserved: false,
          });
        }
        currentDay++;
      }
    }

    return daysOfMonth;
  }

  return (
    <Container>
      <CalendarHeader
        onRightPress={handlePressRight}
        onLeftPress={handleLeftRight}
        year={currentYear}
        month={currentMonth}
      />
      <CalendarSubheader />
      <FlatList
        data={generateCalendar()}
        renderItem={({ item }) => <CalendarDay {...item} />}
        keyExtractor={(item, index) =>
          `${item.year}-${item.month}-${item.day}-${index}`
        }
        numColumns={7}
        style={{ width: "100%" }}
      />
    </Container>
  );
}
