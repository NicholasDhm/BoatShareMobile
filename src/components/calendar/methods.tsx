import { CalendarDayProps } from "../../types/calendar-day";
import { Reservation } from "../../types/reservation";

export function generateCalendar(
  currentYear: number,
  currentMonth: number,
  reservationDict: { [key: string]: Reservation[] }
): CalendarDayProps[] {
  const daysInWeek = 7;
  const date = new Date(currentYear, currentMonth - 1, 1); // Start of the month (month is 0-indexed)

  const firstDayOfWeek = date.getDay(); // Day of the week for the 1st of the month (0 = Sunday, 6 = Saturday)
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate(); // Total days in the given month

  // Get the previous month's total days
  const prevMonthDays = new Date(currentYear, currentMonth - 1, 0).getDate();

  let currentDay = 1 - firstDayOfWeek; // Start with the offset for the previous month
  const daysOfMonth: CalendarDayProps[] = [];

  while (currentDay <= daysInMonth) {
    for (let i = 0; i < daysInWeek; i++) {
      let day = currentDay;
      let month = currentMonth;
      let year = currentYear;

      if (currentDay < 1) {
        // Previous month's days
        day = prevMonthDays + currentDay;
        month = currentMonth - 1 === 0 ? 12 : currentMonth - 1; // Adjust for January
        year = currentMonth - 1 === 0 ? currentYear - 1 : currentYear;
      } else if (currentDay > daysInMonth) {
        // Next month's days
        day = currentDay - daysInMonth;
        month = currentMonth + 1 === 13 ? 1 : currentMonth + 1; // Adjust for December
        year = currentMonth + 1 === 13 ? currentYear + 1 : currentYear;
      }

      const dateKey = `${month}/${day}/${year}`;
      const reservations = reservationDict[dateKey] || [];

      daysOfMonth.push({
        day,
        month,
        year,
        isReserved: reservations.length > 0,
        reservations,
      });

      currentDay++;
    }
  }

  return daysOfMonth;
}