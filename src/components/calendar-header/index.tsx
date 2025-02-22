import { View, Text, Pressable } from "react-native";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { styles } from "./styles";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

type CalendarHeaderProps = {
  year: number;
  month: number;
  onRightPress: () => void;
  onLeftPress: () => void;
};

const PressableAnimated = Animated.createAnimatedComponent(Pressable)

export function CalendarHeader({
  onRightPress,
  onLeftPress,
  year,
  month,
}: CalendarHeaderProps) {
  const monthText = new Date(year, month - 1).toLocaleString("en-US", {
    month: "long",
  });

  // Animation stuff
  const scaleLeft = useSharedValue(1);
  const scaleRight = useSharedValue(1);

  const animatedButtonLeftStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleLeft.value }]
    };
  });

  const animatedButtonRightStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleRight.value }]
    };
  });

  function onPressInLeft() {
    scaleLeft.value = withSpring(0.9);
  }

  function onPressOutLeft() {
    scaleLeft.value = withSpring(1);
  }

  function onPressOutRight() {
    scaleRight.value = withSpring(1);
  }
  function onPressInRight() {
    scaleRight.value = withSpring(0.9);
  }

  return (
    <View style={styles.container}>
      <PressableAnimated style={[styles.button, animatedButtonLeftStyle]} onPress={onLeftPress} onPressIn={onPressInLeft} onPressOut={onPressOutLeft} hitSlop={15}>
        <ArrowLeft size={16} color={"black"} />
      </PressableAnimated>
      <View style={styles.textContainer}>
        <Text style={styles.dateText}>{year}</Text>
        <Text style={styles.dateText}>{monthText}</Text>
      </View>
      <Animated.View style={[styles.button, animatedButtonRightStyle]}>
        <Pressable onPress={onRightPress} onPressIn={onPressInRight} onPressOut={onPressOutRight} hitSlop={15}>
          <ArrowRight size={16} color={"black"} />
        </Pressable>
      </Animated.View>
    </View>
  );
}
