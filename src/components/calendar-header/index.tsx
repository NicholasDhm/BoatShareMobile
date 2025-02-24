import { View, Text, Pressable } from "react-native";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { styles } from "./styles";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { colors } from "../../themes/colors";

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
    <PressableAnimated 
      style={[styles.button, animatedButtonLeftStyle]} 
      onPress={onLeftPress} 
      onPressIn={onPressInLeft} 
      onPressOut={onPressOutLeft} 
      hitSlop={8}
    >
      <ArrowLeft size={16} color={colors.white} />
    </PressableAnimated>

    <View style={styles.textContainer}>
      <Text style={styles.monthYearText}>
        {monthText}
      </Text>      
      <Text style={styles.monthYearText}>
        {year}
      </Text>
    </View>

    <PressableAnimated 
      style={[styles.button, animatedButtonRightStyle]}
      onPress={onRightPress} 
      onPressIn={onPressInRight} 
      onPressOut={onPressOutRight} 
      hitSlop={8}
    >
      <ArrowRight size={16} color={colors.white} />
    </PressableAnimated>
  </View>
);
}
