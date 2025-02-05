import { View, Text } from "react-native";
import { CalendarDayProps } from "../../types/calendar-day";
import { styles, getBackgroundColor } from "./styles";

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
  const isConfirmed = firstReservation ? firstReservation.status === "Confirmed" : false;

  return (
    <View 
      style={[
        styles.container, 
        { backgroundColor: getBackgroundColor(
          firstReservation ? firstReservation.type : "",
          isMine,
          isConfirmed
        )}
      ]}
    >
      <Text style={styles.dayText}>{day}</Text>
    </View>
  );
}
