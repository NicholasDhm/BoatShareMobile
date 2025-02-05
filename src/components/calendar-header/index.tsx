import { View, Text, Pressable } from "react-native";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { styles } from "./styles";

type CalendarHeaderProps = {
  year: number;
  month: number;
  onRightPress: () => void;
  onLeftPress: () => void;
};

export function CalendarHeader({
  onRightPress,
  onLeftPress,
  year,
  month,
}: CalendarHeaderProps) {
  const monthText = new Date(year, month - 1).toLocaleString("en-US", {
    month: "long",
  });

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onLeftPress}>
        <ArrowLeft size={16} color={"black"} />
      </Pressable>
      <View style={styles.textContainer}>
        <Text style={styles.dateText}>{year}</Text>
        <Text style={styles.dateText}>{monthText}</Text>
      </View>
      <Pressable style={styles.button} onPress={onRightPress}>
        <ArrowRight size={16} color={"black"} />
      </Pressable>
    </View>
  );
}
