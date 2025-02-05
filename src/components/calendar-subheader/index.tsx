import { View, Text } from "react-native";
import { styles } from "./styles";

export function CalendarSubheader() {
  return (
    <View style={styles.container}>
      <Text style={styles.weekDay}>Sun</Text>
      <Text style={styles.weekDay}>Mon</Text>
      <Text style={styles.weekDay}>Tue</Text>
      <Text style={styles.weekDay}>Wed</Text>
      <Text style={styles.weekDay}>Thu</Text>
      <Text style={styles.weekDay}>Fri</Text>
      <Text style={styles.weekDay}>Sat</Text>
    </View>
  );
}
