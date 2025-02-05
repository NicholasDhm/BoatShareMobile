import { View, Text } from "react-native";
import { CalendarDayProps } from "../../types/calendar-day";
import { styles, getBackgroundColor } from "./styles";
import { ReservationType } from "../../types/reservation-type";

// TEMPORARY USER ID FOR TEST PURPOSES
const userId = "a8e6596f-2517-4b18-a866-48fa9eb14d41";

export function CalendarDay({ day, reservations }: CalendarDayProps) {
  function getFirstReservation() {
    if (reservations.length === 0) return null;
    return reservations.reduce((earliest, current) => {
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
    if (!firstReservation) return styles.container;

    const baseStyle = {
      ...styles.container,
      backgroundColor: getBackgroundColor(firstReservation.type, isMine, isConfirmed)
    };

    switch (firstReservation.type) {
      case ReservationType.STANDARD:
        return {
          ...baseStyle,
          borderWidth: isConfirmed ? 2 : 1,
          borderColor: isMine ? '#4CAF50' : '#2196F3'
        };
      case ReservationType.SUBSTITUTION:
        return {
          ...baseStyle,
          borderWidth: 2,
          borderColor: '#FFA000'
        };
      case ReservationType.CONTINGENCY:
        return {
          ...baseStyle,
          borderWidth: 2,
          borderColor: '#F44336'
        };
      default:
        return baseStyle;
    }
  }

  return (
    <View style={[styles.container, getReservationStyle()]}>
      <Text style={styles.dayText}>{day}</Text>
    </View>
  );
}
