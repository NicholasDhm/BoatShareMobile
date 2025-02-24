import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";
import { styles } from "./styles";
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring 
} from "react-native-reanimated";
import { colors } from "../../themes/colors";

type ButtonVariant = 'primary' | 'secondary' | 'outline';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function Button({ 
  title, 
  onPress, 
  variant = 'primary',
  disabled = false,
  loading = false,
  icon,
  fullWidth = true,
  ...rest 
}: ButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedTouchable
      style={[
        styles.baseButton,
        styles[variant],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        animatedStyle,
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && (
        <ActivityIndicator 
          color={variant === 'primary' ? '#fff' : colors.prussianBluePrimary} 
          style={styles.spinner}
        />
      )}
      {icon && !loading && icon}
      <Text style={[
        styles.titleBase,
        variant === 'primary' ? styles.titlePrimary :
        variant === 'secondary' ? styles.titleSecondary :
        styles.titleOutline
      ]}>
        {title}
      </Text>
    </AnimatedTouchable>
  );
}