import { View, Text, StyleSheet } from "react-native";
import { CalendarDayProps } from "../../types/calendar-day";

export function CalendarDay(calendarDay: CalendarDayProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{calendarDay.day}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 86,
    width: 64,

    borderWidth: 1,
    borderColor: "gray",

    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
});
