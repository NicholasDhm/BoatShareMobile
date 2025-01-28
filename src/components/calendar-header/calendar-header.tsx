import { ArrowLeft, ArrowRight } from "lucide-react-native";

import { Container, TextContainer, Button, DateText } from "./styles";

export function CalendarHeader() {
  return (
    <Container>
      <Button>
        <ArrowLeft />
      </Button>
      <TextContainer>
        <DateText>2024</DateText>
        <DateText>March</DateText>
      </TextContainer>
      <Button>
        <ArrowRight />
      </Button>
    </Container>
  );
}
