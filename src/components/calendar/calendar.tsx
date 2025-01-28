import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { CalendarHeader } from "../calendar-header/calendar-header";
import { CalendarDay } from "../calendar-day/calendar-day";

const daysOfWeek: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const daysOfMonth: number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
];
// const weeks = [];
const week = [1, 2, 3, 4, 5, 6, 7];

// function getWeeks() {
//   for (let i = 0; i < daysOfMonth.length; i += 7) {
//     weeks.push(daysOfMonth.slice(i, i + 7));
//   }
//   return weeks;
// }

export function Calendar() {
  return (
    <View style={styles.container}>
      <CalendarHeader></CalendarHeader>
      <View style={styles.week}>
        <FlatList
          data={daysOfMonth}
          renderItem={({ item }) => <CalendarDay day={item} />}
          keyExtractor={(item) => item.toString()}
          numColumns={7}
        />
      </View>
      <Text style={styles.text}>Calendar Component</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  week: {
    display: "flex",
    flexDirection: "row",
  },
  text: {
    fontSize: 20,
    color: "#000",
  },
});
