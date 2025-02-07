import { View, Text, Pressable } from "react-native";
import { CalendarDayProps } from "../../types/calendar-day";
import { styles, getBackgroundColor } from "./styles";
import { ReservationStatus } from "../../types/reservation-status";

// TEMPORARY USER ID FOR TEST PURPOSES
const userId = "1";

export function CalendarDay({ day, month, year, reservations, currentMonth, onPress }: CalendarDayProps) {
  const today = new Date();
  const isToday = 
    today.getDate() === day && 
    today.getMonth() + 1 === month && 
    today.getFullYear() === year;
  
  const isOtherMonth = month !== currentMonth;

  function getFirstReservation() {
    if (reservations?.length === 0) return null;
    return reservations?.reduce((earliest, current) => {
      return new Date(earliest.createdAtIsoDate) <
        new Date(current.createdAtIsoDate)
        ? earliest
        : current;
    });
  }

  const firstReservation = getFirstReservation();
  const isMine = firstReservation ? firstReservation.userId === userId : false;
  const isConfirmed = firstReservation ? firstReservation.status === ReservationStatus.Confirmed : false;

  function getReservationStyle() {
    const baseStyles = [
      styles.container,
      isOtherMonth && styles.otherMonth
    ];

    if (!firstReservation) {
      return baseStyles;
    }

    const reservationStyle = {
      backgroundColor: getBackgroundColor(firstReservation.type, isMine, isConfirmed),
    };


    return [...baseStyles, reservationStyle];
  }

  return (
    <Pressable
      onPress={onPress}
      style={getReservationStyle()}
    >
      <Text style={styles.dayText}>{day}</Text>
    </Pressable>
  );
}
