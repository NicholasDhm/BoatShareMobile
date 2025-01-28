import { View, Text, StyleSheet, Pressable } from "react-native";
import { ArrowLeft, ArrowRight } from "lucide-react-native";

export function CalendarHeader() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.buttonContainer}>
        <ArrowLeft />
      </Pressable>
      <View style={styles.textContainer}>
        <Text style={styles.text}>2024</Text>
        <Text style={styles.text}>March</Text>
      </View>
      <Pressable style={styles.buttonContainer}>
        <ArrowRight />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#a2d9eb",
    paddingHorizontal: 16,
    height: 64,
    width: 468,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderRadius: 4,
  },
  buttonContainer: {
    backgroundColor: "#d7e2e9",
    height: 48,
    width: 48,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#bdbdbdff",
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  text: {
    fontSize: 20,
  },
});
