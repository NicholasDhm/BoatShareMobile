import { TouchableOpacityProps } from "react-native";
import { ButtonContainer, Title } from "./styles";

type ButtonStyleProps = TouchableOpacityProps & {
  title: string;
};

export function Button({ title, ...rest }: ButtonStyleProps) {
  return (
    <ButtonContainer {...rest}>
      <Title>{title}</Title>
    </ButtonContainer>
  );
}
