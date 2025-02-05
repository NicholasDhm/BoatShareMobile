import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";

type ButtonStyleProps = TouchableOpacityProps & {
  title: string;
};

export function Button({ title, ...rest }: ButtonStyleProps) {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
