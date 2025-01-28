import { View, Text, StyleSheet } from "react-native";

type CalendarDayProps = {
  day: number;
};

export function CalendarDay({ day }: CalendarDayProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{day}</Text>
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
