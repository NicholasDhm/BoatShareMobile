import { CalendarDayProps } from "../../@types/calendar-day";
import { Reservation } from "../../@types/reservation";
import { ReservationStatus } from "../../@types/reservation-status";
import { ReservationType } from "../../@types/reservation-type";
import { useInfo } from "../../contexts/info";


function parseDate(dateString: string) {
  if (!dateString) return 0;
  const [date, time] = dateString.split(' ');
  return new Date(`${date}T${time}Z`).getTime();
};

export function getFirstReservation(reservations: Reservation[] | undefined) {
  if (!reservations || reservations.length === 0) return null;
  return reservations.reduce((earliest, current) => {
    return parseDate(earliest.createdAt) < parseDate(current.createdAt)
      ? earliest
      : current;
  });
}

export function generateCalendar(
  currentYear: number,
  currentMonth: number,
  reservations: Reservation[]
): CalendarDayProps[] {
  const { currentUserReservations } = useInfo();
  const reservationDict: { [key: string]: Reservation[] } = {};

  // Normalize dates with explicit timezone handling
  reservations.forEach(reservation => {
    const date = new Date(reservation.date + 'T00:00:00.000-03:00');
    const dateKey = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    if (!reservationDict[dateKey]) {
      reservationDict[dateKey] = [];
    }
    reservationDict[dateKey].push(reservation);
  });

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

      const firstReservation = getFirstReservation(reservations);
      const currentUserHasReservation = reservations.some(r => currentUserReservations.some(cur => cur.id === r.id));
      let type: ReservationType | null = null;
      let status: ReservationStatus | null = null;

      if (currentUserHasReservation) {
        const userReservation = reservations.find(r => currentUserReservations.some(cur => cur.id === r.id));
        if (userReservation) {
          type = userReservation.type;
          status = userReservation.status;
        }
      } else if (firstReservation && firstReservation.status === ReservationStatus.CONFIRMED) {
        type = null;
        status = null;
      } else if (firstReservation) {
        type = ReservationType.SUBSTITUTION;
        status = null;
      } else {
        type = null;
        status = null;
      }
      
      const calendarDay: CalendarDayProps = {
        day,
        month,
        year,
        currentMonth,
        isReserved: reservations.length > 0,
        type: type,
        status: status,
        reservations: reservations,
      };

      daysOfMonth.push(calendarDay);
      currentDay++;
    }
  }

  return daysOfMonth;
}