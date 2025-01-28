import { ArrowLeft, ArrowRight } from "lucide-react-native";

import { Container, TextContainer, Button, DateText } from "./styles";

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
    <Container>
      <Button onPress={onLeftPress}>
        <ArrowLeft />
      </Button>
      <TextContainer>
        <DateText>{year}</DateText>
        <DateText>{monthText}</DateText>
      </TextContainer>
      <Button onPress={onRightPress}>
        <ArrowRight />
      </Button>
    </Container>
  );
}
