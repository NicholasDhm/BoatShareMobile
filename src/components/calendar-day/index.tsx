import { View, Text } from "react-native";
import { CalendarDayProps } from "../../types/calendar-day";
import { styles, getBackgroundColor } from "./styles";

// TEMPORARY USER ID FOR TEST PURPOSES
const userId = "1";

export function CalendarDay({ day, month, year, reservations, currentMonth }: CalendarDayProps) {
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
  const isConfirmed = firstReservation ? firstReservation.status === "Confirmed" : false;

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
    <View style={getReservationStyle()}>
      <Text style={styles.dayText}>{day}</Text>
    </View>
  );
}
